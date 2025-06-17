document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("edit-teacher-form");

    // Lấy chỉ mục từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get("index");

    if (index === null) {
        alert("Lỗi! Không tìm thấy giáo viên.");
        window.location.href = "index.html";
        return;
    }

    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];
    let teacher = teachers[index];

    // Hiển thị dữ liệu lên form
    document.getElementById("teacher-index").value = index;
    document.getElementById("fullName").value = teacher.fullName;
    document.getElementById("subject").value = teacher.subject;
    document.getElementById("grade").value = teacher.grade;
    document.getElementById("email").value = teacher.email;
    document.getElementById("gender").value = teacher.gender;

    // Xử lý khi nhấn nút "Lưu thay đổi"
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Cập nhật thông tin
        teachers[index] = {
            fullName: document.getElementById("fullName").value,
            subject: document.getElementById("subject").value,
            grade: document.getElementById("grade").value,
            email: document.getElementById("email").value,
            gender: document.getElementById("gender").value,
        };

        // Lưu lại vào localStorage
        localStorage.setItem("teachers", JSON.stringify(teachers));

        // Quay lại trang danh sách
        alert("Thông tin giáo viên đã được cập nhật!");
        window.location.href = "index.html";
    });
});
