document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const teacherIndex = urlParams.get("index");
    const teacherData = JSON.parse(localStorage.getItem("teachers")) || [];

    if (teacherIndex !== null && teacherData[teacherIndex]) {
        document.getElementById("edit-name").value = teacherData[teacherIndex].fullName;
        document.getElementById("edit-email").value = teacherData[teacherIndex].email;
        document.getElementById("edit-subject").value = teacherData[teacherIndex].subject;
        document.getElementById("edit-grade").value = teacherData[teacherIndex].grade;
        document.getElementById("edit-gender").value = teacherData[teacherIndex].gender;
    }

    document.getElementById("edit-teacher-form").addEventListener("submit", function (event) {
        event.preventDefault();

        if (teacherIndex !== null && teacherData[teacherIndex]) {
            teacherData[teacherIndex].fullName = document.getElementById("edit-name").value;
            teacherData[teacherIndex].email = document.getElementById("edit-email").value;
            teacherData[teacherIndex].subject = document.getElementById("edit-subject").value;
            teacherData[teacherIndex].grade = document.getElementById("edit-grade").value;
            teacherData[teacherIndex].gender = document.getElementById("edit-gender").value;

            localStorage.setItem("teachers", JSON.stringify(teacherData));
        }

        // Chuyển về danh sách giáo viên sau khi lưu
        window.location.href = "teacher-list.html";
    });
});
