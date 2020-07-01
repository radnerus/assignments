const tableData = document.querySelector('#table-data');
const tableHeader = document.querySelector('#table-header');

const input = [{
    "Organization": "Google",
    "UserId": "akumar",
    "UserName": "Ashok Kumar",
    "Department": "Sales",
    "Designation": "Sales",
    "CheckInTime": 1548909000000,
    "CheckOutTime": 1548945000000
}, {
    "Organization": "Google",
    "UserId": "akumar",
    "UserName": "Ashok Kumar",
    "Department": "Sales",
    "Designation": "Sales",
    "CheckInTime": 1549081800000,
    "CheckOutTime": 1549110600000
}, {
    "Organization": "FB",
    "UserId": "phanis",
    "UserName": "Phani Sai",
    "Department": "Sales",
    "Designation": "Sales",
    "CheckInTime": 1548909000000,
    "CheckOutTime": 1548945000000
}, {
    "Organization": "FB",
    "UserId": "phanis",
    "UserName": "Phani Sai",
    "Department": "Sales",
    "Designation": "Sales",
    "CheckInTime": 1549081800000,
    "CheckOutTime": 1549110600000
}, {
    "Organization": "FB",
    "UserId": "lakshmig",
    "UserName": "Laskhmi Gayathri",
    "Department": "Quality",
    "Designation": "QA Engineer",
    "CheckInTime": 1549081800000,
    "CheckOutTime": 1549110600000
}, {
    "Organization": "FB",
    "UserId": "lakshmig",
    "UserName": "Laskhmi Gayathri",
    "Department": "Quality",
    "Designation": "QA Engineer",
    "CheckInTime": 1549081800000,
    "CheckOutTime": 1549110600000
}];

const config = [{
    HeaderName: 'Organization',
    Column: 'Organization',
    Merge: true
}, {
    HeaderName: 'Department',
    Column: 'Department',
    Merge: true
}, {
    HeaderName: 'UserName',
    Column: 'UserName',
    Merge: true
}, {
    HeaderName: 'Date',
    Column: ({ CheckInTime }) => {
        return moment(CheckInTime).format("DD/MM/YYYY")
    },
    Merge: false
}, {
    HeaderName: 'Time',
    Column: ({ CheckInTime, CheckOutTime }) => {
        // Column can be a string or callback which can be called with the specific row record to get the computed column value.
        const secs = ((CheckOutTime - CheckInTime) / 1000)
            // TODO: Return in (x Hrs y Mins) format.
        return (secs / 60) / 60 + ' Hours ' + ((secs / 60) % 60) + ' Mins'; // Returning in minutes	
    },
    Merge: false
}, ]

const loadTable = () => {
        const merges = [];
        const operations = {};
        const headers = config.map(c => c.HeaderName);
        tableHeader.innerHTML = config.reduce((acc, cur) => {
            if (cur.Merge) {
                merges.push(cur.Column);
            } else {
                operations[cur.HeaderName] = cur.Column;
            }
            return acc + `<th>${cur.HeaderName}</th>`
        }, '');

        console.log(merges, operations, headers);
        const orgCount = {}
        const organizationData = input.reduce((acc, cur) => {
            if (!acc[cur.Organization]) {
                acc[cur.Organization] = {};
                orgCount[cur.Organization] = 0;
            }
            orgCount[cur.Organization]++;
            const org = acc[cur.Organization];

            if (!org[cur.Department]) {
                org[cur.Department] = {};
            }
            const dept = org[cur.Department];

            if (!dept[cur.UserName]) {
                dept[cur.UserName] = [];
            }
            const user = dept[cur.UserName];

            user.push({ date: operations['Date']({ CheckInTime: cur.CheckInTime }), time: operations['Time']({ CheckInTime: cur.CheckInTime, CheckOutTime: cur.CheckOutTime }) });


            return acc;
        }, {});

        console.log(organizationData);
        console.log(orgCount);

        const organizationRows = Object.keys(organizationData).map(org => {
                    const orgVal = organizationData[org];
                    const departments = Object.keys(orgVal);

                    return departments.map((dept, dIndex) => {
                                const deptVal = organizationData[org][dept];
                                const users = Object.keys(deptVal);

                                const uSpan = users.reduce((acc, cur) => acc + deptVal[cur].length, 0);

                                console.log(`deptVal`, deptVal);
                                return users.map((user, uIndex) => {
                                            const userVal = organizationData[org][dept][user];
                                            console.log(userVal.length);
                                            return userVal.map((entry, eIndex) => {
                                                        return `
                                                <tr>
                                                    ${(dIndex === 0 && uIndex === 0 && eIndex === 0) ? `<td rowspan="${orgCount[org]}">${org}</td>` : ''}
                                                    ${(uIndex === 0 && eIndex === 0) ? `<td rowspan="${uSpan}">${dept}</td>` : ''}
                                                    ${eIndex === 0 ? `<td rowspan="${userVal.length}">${user}</td>` : ''}
                                                    <td>${entry.date}</td>
                                                    <td>${entry.time}</td>
                                                </tr>
                                            `;
                }).join('')
            }).join('');
        }).join('');

        // const orgRow = ;
        // return orgRow;
    });

    tableData.innerHTML = organizationRows.join('');
}