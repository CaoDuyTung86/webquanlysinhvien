document.addEventListener("DOMContentLoaded", function () {
    renderTeachers();
});

function renderTeachers() {
    const teacherList = document.getElementById("teacher-list");
    teacherList.innerHTML = "";
    
    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];
    
    teachers.forEach((teacher, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${teacher.fullName}</td>
            <td>${teacher.subject}</td>
            <td>${teacher.grade ? teacher.grade + ' - ' + (teacher.shift || "Chưa có ca") : "Chưa có lớp"}</td>
            <td>Đang dạy</td>
            <td>
                <button onclick="assignClass(${index})">Gán lớp</button>
              
            </td>
        `;
        teacherList.appendChild(row);
    });
}

function assignClass(index) {
    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];
    const newClass = prompt("Nhập tên lớp muốn gán cho giáo viên:");
    if (!newClass) return;

    const availableShifts = ["Ca 1", "Ca 2", "Ca 3"];
    const existingShifts = teachers
        .filter(t => t.grade === newClass)
        .map(t => t.shift);
    
    const remainingShifts = availableShifts.filter(shift => !existingShifts.includes(shift));
    if (remainingShifts.length === 0) {
        alert("Tất cả các ca của lớp này đã được gán. Vui lòng chọn lớp khác.");
        return;
    }

    const selectedShift = prompt(`Chọn ca (${remainingShifts.join(", ")}):`);
    if (!remainingShifts.includes(selectedShift)) {
        alert("Ca không hợp lệ hoặc đã đầy. Hãy chọn lại!");
        return;
    }

    teachers[index].grade = newClass;
    teachers[index].shift = selectedShift;
    localStorage.setItem("teachers", JSON.stringify(teachers));
    
    alert("Gán lớp thành công!");
    updateAllPages();
}

function editTeacher(index) {
    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];
    let newName = prompt("Nhập tên mới:", teachers[index].fullName);
    let newSubject = prompt("Nhập môn mới:", teachers[index].subject);
    
    if (newName && newSubject) {
        teachers[index].fullName = newName;
        teachers[index].subject = newSubject;
        localStorage.setItem("teachers", JSON.stringify(teachers));
        alert("Cập nhật giáo viên thành công!");
        updateAllPages();
    }
}

function deleteTeacher(index) {
    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];
    teachers.splice(index, 1);
    localStorage.setItem("teachers", JSON.stringify(teachers));
    alert("Xóa giáo viên thành công!");
    updateAllPages();
}

function updateAllPages() {
    renderTeachers();
    window.dispatchEvent(new Event("storage"));
}

window.addEventListener("storage", function () {
    renderTeachers();
});
