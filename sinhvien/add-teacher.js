document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".add-teacher form");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Ngăn trang reload khi submit

            // Lấy dữ liệu từ form
            const fullName = document.querySelector("input[placeholder='Nhập họ và tên']").value.trim();
            const email = document.querySelector("input[placeholder='Nhập email']").value.trim();
            const subject = document.querySelector("input[placeholder='Nhập môn dạy']").value.trim();
            const grade = document.querySelector("input[placeholder='Nhập lớp']").value.trim();
            const phone = document.querySelector("input[placeholder='Nhập số điện thoại']").value.trim();
            const gender = document.querySelector("select").value;

            // Kiểm tra dữ liệu hợp lệ
            if (!fullName || !email || !subject || !grade || !phone) {
                alert("Vui lòng điền đầy đủ thông tin!");
                return;
            }

            // Tạo đối tượng giáo viên
            const teacher = { fullName, email, subject, grade, phone, gender };

            // Lưu vào LocalStorage
            let teachers = JSON.parse(localStorage.getItem("teachers")) || [];
            teachers.push(teacher);
            localStorage.setItem("teachers", JSON.stringify(teachers));

            // Hiển thị thông báo và reset form
            alert("Thêm giáo viên thành công!");
            form.reset();
        });
    }
});
