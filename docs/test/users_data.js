function goToProfilePage(userId) {
    console.log(userId);
}

const data = () => ({
    columns: [
        {
            label: "First Name",
            field: "firstName",
            width: 150,
            attributes: {
                "aria-controls": "DataTable",
                "aria-label": "Name"
            }
        },
        {
            label: "Last Name",
            field: "lastName",
            width: 150,
            attributes: {
                "aria-controls": "DataTable",
                "aria-label": "Name"
            }
        },
        {
            label: "Gender",
            field: "gender",
            width: 100
        },
        {
            label: "Email",
            field: "email",
            width: 270
        },
        {
            label: "Password",
            field: "password",
            width: 200
        },
        {
            label: "User Role",
            field: "userRole",
            width: 100
        },
        {
            label: "Faculty",
            field: "faculty",
            width: 100
        }
    ],
    rows: [
        {
            firstName: "Tiger",
            lastName: "Nixon",
            gender: "Male",
            email: "e190001@school.com",
            password: "********",
            userRole: "Student",
            faculty: "SOC",
            clickEvent: () => goToProfilePage(1)
        },
        {
            firstName: "Garrett",
            lastName: "Winters",
            gender: "Male",
            email: "e190002@school.com",
            password: "********",
            userRole: "Admin",
            faculty: "SOC",
            clickEvent: () => goToProfilePage(1)
        },
        {
            firstName: "Ashton",
            lastName: "Cox",
            gender: "Male",
            email: "e190003@school.com",
            password: "********",
            userRole: "Admin",
            faculty: "SOC",
            clickEvent: () => goToProfilePage(1)
        },
        {
            firstName: "Cedric",
            lastName: "Kelly",
            gender: "Female",
            email: "e190004@school.com",
            password: "********",
            userRole: "Teacher",
            faculty: "SOC",
            clickEvent: () => goToProfilePage(1)
        },
        {
            firstName: "Airi",
            lastName: "Satou",
            gender: "Female",
            email: "e190005@school.com",
            password: "********",
            userRole: "Teacher",
            faculty: "SOC",
            clickEvent: () => goToProfilePage(1)
        },
        {
            firstName: "Brielle",
            lastName: "Williamson",
            gender: "Female",
            email: "e190006@school.com",
            password: "********",
            userRole: "Student",
            faculty: "SOC",
            clickEvent: () => goToProfilePage(1)
        },
        {
            firstName: "Herrod",
            lastName: "Chandler",
            gender: "Male",
            email: "e190007@school.com",
            password: "********",
            userRole: "Student",
            faculty: "SOC",
            clickEvent: () => goToProfilePage(1)
        },
        {
            firstName: "Rhona",
            lastName: "Davidson",
            gender: "Female",
            email: "e190008@school.com",
            password: "********",
            userRole: "Student",
            faculty: "SOC",
            clickEvent: () => goToProfilePage(1)
        },
        {
            firstName: "Colleen",
            lastName: "Hurst",
            gender: "Female",
            email: "e190009@school.com",
            password: "********",
            userRole: "Student",
            faculty: "SOC",
            clickEvent: () => goToProfilePage(1)
        },
        {
            firstName: "Sonya",
            lastName: "Frost",
            gender: "Female",
            email: "e190010@school.com",
            password: "********",
            userRole: "Student",
            faculty: "SOC",
            clickEvent: () => goToProfilePage(1)
        },
        {
            firstName: "Jena",
            lastName: "Gaines",
            gender: "Female",
            email: "e190011@school.com",
            password: "********",
            userRole: "Teacher",
            faculty: "SOC",
            clickEvent: () => goToProfilePage(1)
        },
        {
            firstName: "Quinn",
            lastName: "Flynn",
            gender: "Female",
            email: "e190012@school.com",
            password: "********",
            userRole: "Teacher",
            faculty: "SOC",
            clickEvent: () => goToProfilePage(1)
        },
        {
            firstName: "Charde",
            lastName: "Marshall",
            gender: "Male",
            email: "e190013@school.com",
            password: "********",
            userRole: "Teacher",
            faculty: "SOC",
            clickEvent: () => goToProfilePage(1)
        },
        {
            firstName: "Haley",
            lastName: "Kennedy",
            gender: "Male",
            email: "e190014@school.com",
            password: "********",
            userRole: "Student",
            faculty: "SOC",
            clickEvent: () => goToProfilePage(1)
        },
        {
            firstName: "Tatyana",
            lastName: "Fitzpatrick",
            gender: "Female",
            email: "e190015@school.com",
            password: "********",
            userRole: "Teacher",
            faculty: "SOC",
            clickEvent: () => goToProfilePage(1)
        },
        {
            firstName: "Michael",
            lastName: "Silva",
            gender: "Male",
            email: "e190016@school.com",
            password: "********",
            userRole: "Teacher",
            faculty: "SOC",
            clickEvent: () => goToProfilePage(1)
        }
    ]
})

export default data;
