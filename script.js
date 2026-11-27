
// STUDENT DETAILS AND ATTENDANCE DATA
// Demo records: 16-11-2026 to 26-11-2026 (Sunday holiday)

const students = [
    {
        regno: "245110023",
        name: "M. Monika",
        department: "CSE",
        dob: "2008-03-20",
        attendance: [
            { date: "2026-11-16", status: "Present" },
            { date: "2026-11-17", status: "Present" },
            { date: "2026-11-18", status: "Present" },
            { date: "2026-11-19", status: "Present" },
            { date: "2026-11-20", status: "Absent" },
            { date: "2026-11-21", status: "Present" },
            { date: "2026-11-23", status: "Present" },
            { date: "2026-11-24", status: "Present" },
            { date: "2026-11-25", status: "Present" },
            { date: "2026-11-26", status: "Present" }
        ]
    },
    {
        regno: "245110033",
        name: "S. Ruthika",
        department: "CSE",
        dob: "2008-08-08",
        attendance: [
            { date: "2026-11-16", status: "Present" },
            { date: "2026-11-17", status: "Present" },
            { date: "2026-11-18", status: "Absent" },
            { date: "2026-11-19", status: "Present" },
            { date: "2026-11-20", status: "Present" },
            { date: "2026-11-21", status: "Present" },
            { date: "2026-11-23", status: "Present" },
            { date: "2026-11-24", status: "Absent" },
            { date: "2026-11-25", status: "Present" },
            { date: "2026-11-26", status: "Present" }
        ]
    },
    {
        regno: "245110039",
        name: "S. Tejaswini",
        department: "CSE",
        dob: "2008-03-03",
        attendance: [
            { date: "2026-11-16", status: "Present" },
            { date: "2026-11-17", status: "Present" },
            { date: "2026-11-18", status: "Present" },
            { date: "2026-11-19", status: "Present" },
            { date: "2026-11-20", status: "Present" },
            { date: "2026-11-21", status: "Present" },
            { date: "2026-11-23", status: "Present" },
            { date: "2026-11-24", status: "Present" },
            { date: "2026-11-25", status: "Present" },
            { date: "2026-11-26", status: "Present" }
        ]
    },
    {
        regno: "245110046",
        name: "V. Harini",
        department: "CSE",
        dob: "2008-04-13",
        attendance: [
            { date: "2026-11-16", status: "Present" },
            { date: "2026-11-17", status: "Absent" },
            { date: "2026-11-18", status: "Present" },
            { date: "2026-11-19", status: "Present" },
            { date: "2026-11-20", status: "Present" },
            { date: "2026-11-21", status: "Present" },
            { date: "2026-11-23", status: "Present" },
            { date: "2026-11-24", status: "Present" },
            { date: "2026-11-25", status: "Present" },
            { date: "2026-11-26", status: "Present" }
        ]
    },
    {
        regno: "245110050",
        name: "B. Madhana",
        department: "CSE",
        dob: "2006-12-12",
        attendance: [
            { date: "2026-11-16", status: "Present" },
            { date: "2026-11-17", status: "Present" },
            { date: "2026-11-18", status: "Present" },
            { date: "2026-11-19", status: "Absent" },
            { date: "2026-11-20", status: "Present" },
            { date: "2026-11-21", status: "Present" },
            { date: "2026-11-23", status: "Absent" },
            { date: "2026-11-24", status: "Present" },
            { date: "2026-11-25", status: "Present" },
            { date: "2026-11-26", status: "Present" }
        ]
    }
];

const loginForm = document.getElementById("loginForm");
const loginPage = document.getElementById("loginPage");
const dashboardPage = document.getElementById("dashboardPage");
const loginMessage = document.getElementById("loginMessage");

// LOGIN VALIDATION

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const regno = document.getElementById("regno").value.trim();
    const department = document.getElementById("department").value;
    const dob = document.getElementById("dob").value;

    const student = students.find(function (item) {
        return item.regno === regno &&
               item.department === department &&
               item.dob === dob;
    });

    if (student) {
        sessionStorage.setItem("activeStudent", student.regno);

        loginMessage.textContent = "Login Successful!";
        loginMessage.className = "form-message success-message";

        showDashboard(student);
    } else {
        loginMessage.textContent =
            "Invalid details. Please check Register Number, Department and Date of Birth.";

        loginMessage.className = "form-message error-message";
    }
});

// SHOW DASHBOARD

function showDashboard(student) {
    loginPage.hidden = true;
    dashboardPage.hidden = false;

    document.getElementById("studentName").textContent = student.name;

    document.getElementById("studentDetails").textContent =
        "Register Number: " + student.regno +
        " | Department: " + student.department;

    document.getElementById("studentInitial").textContent =
        student.name.trim().charAt(0).toUpperCase();

    const totalDays = student.attendance.length;

    const presentDays = student.attendance.filter(
        record => record.status === "Present"
    ).length;

    const absentDays = student.attendance.filter(
        record => record.status === "Absent"
    ).length;

    const percentage = totalDays
        ? (presentDays / totalDays) * 100
        : 0;

    document.getElementById("totalDays").textContent = totalDays;
    document.getElementById("presentDays").textContent = presentDays;
    document.getElementById("absentDays").textContent = absentDays;

    document.getElementById("attendancePercent").textContent =
        percentage.toFixed(0) + "%";

    document.getElementById("progressBar").style.width =
        percentage + "%";

    document.getElementById("attendanceStatus").textContent =
        percentage.toFixed(0) + "% Recorded";

    displayAttendanceHistory(student);
}

// ATTENDANCE HISTORY

function displayAttendanceHistory(student) {
    const tableBody = document.getElementById("attendanceTableBody");

    tableBody.innerHTML = "";

    if (student.attendance.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 2;
        cell.textContent = "No Attendance Records Found";

        row.appendChild(cell);
        tableBody.appendChild(row);

        return;
    }

    student.attendance.forEach(function (record) {
        const row = document.createElement("tr");

        const dateCell = document.createElement("td");
        const statusCell = document.createElement("td");

        const dateParts = record.date.split("-");

        dateCell.textContent =
            dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];

        statusCell.textContent = record.status;

        statusCell.className =
            record.status === "Present"
                ? "status-present"
                : "status-absent";

        row.appendChild(dateCell);
        row.appendChild(statusCell);

        tableBody.appendChild(row);
    });
}

// LOGOUT

document.getElementById("logoutButton").addEventListener("click", function () {
    sessionStorage.removeItem("activeStudent");

    dashboardPage.hidden = true;
    loginPage.hidden = false;

    loginForm.reset();

    loginMessage.textContent = "";
    loginMessage.className = "form-message";
});

// REMEMBER LOGIN DURING REFRESH

const savedRegno = sessionStorage.getItem("activeStudent");

if (savedRegno) {
    const savedStudent = students.find(
        student => student.regno === savedRegno
    );

    if (savedStudent) {
        showDashboard(savedStudent);
    } else {
        sessionStorage.removeItem("activeStudent");
    }
}
