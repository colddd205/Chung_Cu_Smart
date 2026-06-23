// Cấu hình Supabase (Lấy URL và Key trong Settings -> API của Supabase)
const SB_URL = "URL_CỦA_BẠN";
const SB_KEY = "KEY_CỦA_BẠN";
const _supabase = supabase.createClient(SB_URL, SB_KEY);

let user = null; // Thông tin người dùng đang đăng nhập
let roomsData = [];

// 1. Phân quyền và Đăng nhập
async function auth() {
    const input = document.getElementById('user-input').value.toLowerCase();
    const pass = document.getElementById('pass-input').value;

    if(pass !== "123456") return alert("Sai mật khẩu!");

    if(input === "admin") {
        user = { role: 'admin' };
    } else {
        const roomId = input.replace('p', '');
        let { data } = await _supabase.from('rooms').select('*').eq('id', roomId).single();
        if(!data) return alert("Phòng không tồn tại!");
        user = { role: 'user', roomId: roomId, data: data };
    }

    document.getElementById('login-box').classList.add('hidden');
    document.getElementById('main-ui').classList.remove('hidden');
    document.getElementById('user-tag').innerText = "Xin chào " + input.toUpperCase();
    
    initFloorSelect();
    loadRooms();
}

// 2. Load danh sách 100 phòng
function initFloorSelect() {
    const s = document.getElementById('floor-select');
    for(let i=1; i<=10; i++) {
        s.innerHTML += `<option value="${i}">Tầng ${i}</option>`;
    }
}

async function loadRooms() {
    const floor = document.getElementById('floor-select').value;
    let query = _supabase.from('rooms').select('*').order('id');
    
    if(floor != 0) query = query.eq('floor', floor);
    
    let { data } = await query;
    roomsData = data;
    
    const container = document.getElementById('room-grid');
    container.innerHTML = "";
    
    data.forEach(r => {
        const div = document.createElement('div');
        const statusClass = r.status === 'Trống' ? 'status-trong' : (r.status === 'Đang thuê' ? 'status-thue' : 'status-baotri');
        div.className = `room ${statusClass}`;
        div.innerHTML = `<b>P${r.id}</b><br><small>${r.type}</small>`;
        div.onclick = () => openRoom(r.id);
        container.appendChild(div);
    });
}

// 3. Mở chi tiết phòng (Smart home + Cư dân)
async function openRoom(id) {
    const r = roomsData.find(x => x.id == id);
    document.getElementById('m-room-id').innerText = "Phòng " + id;
    document.getElementById('m-elec').innerText = r.electricity_usage;
    
    // Cư dân
    let { data: res } = await _supabase.from('residents').select('*').eq('room_id', id).single();
    document.getElementById('m-tenant').innerText = res ? `Khách: ${res.fullname} (${res.phone})` : "Phòng trống";
    document.getElementById('m-history').innerText = res ? `Lịch sử: ${res.history || 'Mới nhận phòng'}` : "";

    // Nút Smart Home
    updateSmartUI(r);

    // Đồ đạc
    const furnDiv = document.getElementById('m-furniture');
    furnDiv.innerHTML = "";
    r.furniture.forEach((f, index) => {
        furnDiv.innerHTML += `
            <div style="margin-bottom:5px">
                ${f.name}: <b>${f.status}</b>
                <button onclick="updateFurniture(${id}, ${index}, 'Hỏng')">Báo Hỏng</button>
                <button onclick="updateFurniture(${id}, ${index}, 'Tốt')">Đã Sửa</button>
            </div>`;
    });

    document.getElementById('modal').classList.remove('hidden');
}

// 4. Điều khiển Smart Home (Bật/Tắt điện điều hòa)
async function toggleSmart(type) {
    const id = document.getElementById('m-room-id').innerText.replace('Phòng ', '');
    const r = roomsData.find(x => x.id == id);
    
    const field = type === 'light' ? 'light_status' : 'air_status';
    const newVal = !r[field];

    const { error } = await _supabase.from('rooms').update({ [field]: newVal }).eq('id', id);
    if(!error) {
        r[field] = newVal;
        updateSmartUI(r);
        alert("Đã gửi lệnh tới thiết bị!");
    }
}

function updateSmartUI(r) {
    const bLight = document.getElementById('btn-light');
    const bAir = document.getElementById('btn-air');
    
    bLight.innerText = "Đèn: " + (r.light_status ? "BẬT" : "TẮT");
    bLight.className = r.light_status ? "btn-on" : "btn-off";
    
    bAir.innerText = "Điều hòa: " + (r.air_status ? "BẬT" : "TẮT");
    bAir.className = r.air_status ? "btn-on" : "btn-off";
}

function closeModal() { document.getElementById('modal').classList.add('hidden'); }

function showTab(t) {
    document.getElementById('tab-rooms').classList.toggle('hidden', t !== 'rooms');
    document.getElementById('tab-billing').classList.toggle('hidden', t !== 'billing');
}