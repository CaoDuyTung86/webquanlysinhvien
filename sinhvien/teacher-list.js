document.addEventListener("DOMContentLoaded", function () {
    const teacherListTable = document.getElementById("teacher-list");

    if (teacherListTable) {
        loadTeachers();
    }

    function loadTeachers() {
        let teachers = JSON.parse(localStorage.getItem("teachers")) || [];
        teacherListTable.innerHTML = "";

        teachers.forEach((teacher, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><span class="view-mode">${teacher.fullName}</span><input class="edit-mode" type="text" value="${teacher.fullName}" style="display:none;"></td>
                <td><span class="view-mode">${teacher.subject}</span><input class="edit-mode" type="text" value="${teacher.subject}" style="display:none;"></td>
                <td><span class="view-mode">${teacher.grade}</span><input class="edit-mode" type="text" value="${teacher.grade}" style="display:none;"></td>
                <td><span class="view-mode">${teacher.email}</span><input class="edit-mode" type="email" value="${teacher.email}" style="display:none;"></td>
                <td><span class="view-mode">${teacher.gender}</span>
                    <select class="edit-mode" style="display:none;">
                        <option value="Nam" ${teacher.gender === "Nam" ? "selected" : ""}>Nam</option>
                        <option value="Nữ" ${teacher.gender === "Nữ" ? "selected" : ""}>Nữ</option>
                    </select>
                </td>
                <td style="position: relative;">
                    <button class="expand-btn" data-index="${index}">+</button>
                    <div class="action-buttons" id="actions-${index}" style="display: none;">
                        <button class="edit-btn" data-index="${index}">Sửa</button>
                        <button class="delete-btn" data-index="${index}">Xóa</button>
                    </div>
                </td>
            `;
            teacherListTable.appendChild(row);
        });

        document.querySelectorAll(".expand-btn").forEach(button => {
            button.addEventListener("click", function (event) {
                event.stopPropagation();
                let index = this.getAttribute("data-index");
                let actionDiv = document.getElementById(`actions-${index}`);
                document.querySelectorAll(".action-buttons").forEach(div => {
                    div.style.display = "none";
                });
                actionDiv.style.display = actionDiv.style.display === "block" ? "none" : "block";
            });
        });

        document.addEventListener("click", function () {
            document.querySelectorAll(".action-buttons").forEach(div => {
                div.style.display = "none";
            });
        });

        document.querySelectorAll(".edit-mode").forEach(input => {
            input.addEventListener("keypress", function (event) {
                if (event.key === "Enter") {
                    let row = this.closest("tr");
                    let index = row.querySelector(".expand-btn").getAttribute("data-index");
                    saveTeacher(index, row);
                }
            });
        });

        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", function () {
                let row = this.closest("tr");
                row.querySelectorAll(".view-mode").forEach(el => el.style.display = "none");
                row.querySelectorAll(".edit-mode").forEach(el => el.style.display = "inline-block");
            });
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                deleteTeacher(index);
            });
        });
    }

    function saveTeacher(index, row) {
        let teachers = JSON.parse(localStorage.getItem("teachers")) || [];
        
        teachers[index] = {
            fullName: row.querySelector("td:nth-child(1) input").value,
            subject: row.querySelector("td:nth-child(2) input").value,
            grade: row.querySelector("td:nth-child(3) input").value,
            email: row.querySelector("td:nth-child(4) input").value,
            gender: row.querySelector("td:nth-child(5) select").value
        };

        localStorage.setItem("teachers", JSON.stringify(teachers));
        loadTeachers();
    }

    function deleteTeacher(index) {
        let teachers = JSON.parse(localStorage.getItem("teachers")) || [];
        teachers.splice(index, 1);
        localStorage.setItem("teachers", JSON.stringify(teachers));
        loadTeachers();
    }
});


