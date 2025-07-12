const employees = [
  { id: 1, firstName: "Alice", lastName: "Johnson", email: "alice@company.com", department: "HR", role: "Manager", character: "Empathetic, loves yoga." },
  { id: 2, firstName: "Bob", lastName: "Smith", email: "bob@company.com", department: "Engineering", role: "Developer", character: "Analytical, loves climbing." },
  { id: 3, firstName: "Charlie", lastName: "Brown", email: "charlie@company.com", department: "Finance", role: "Analyst", character: "Detail-oriented, puzzle lover." }
];

let filteredEmployees = [...employees];
let pageSize = 10;

function renderEmployees() {
  const list = document.getElementById('employee-list');
  list.innerHTML = '';
  filteredEmployees.slice(0, pageSize).forEach(emp => {
    const card = document.createElement('div');
    card.className = 'employee-card';
    card.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <p><strong>Character:</strong> ${emp.character}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
    list.appendChild(card);
  });
}

function deleteEmployee(id) {
  const confirmed = confirm("Are you sure you want to delete this employee?");
  if (!confirmed) return;
  const index = employees.findIndex(e => e.id === id);
  if (index !== -1) {
    employees.splice(index, 1);
    filteredEmployees = [...employees];
    renderEmployees();
  }
}

function editEmployee(id) {
  const emp = employees.find(e => e.id === id);
  if (!emp) return;

  document.getElementById('addForm').classList.remove('hidden');
  document.getElementById('addFirstName').value = emp.firstName;
  document.getElementById('addLastName').value = emp.lastName;
  document.getElementById('addEmail').value = emp.email;
  document.getElementById('addDepartment').value = emp.department;
  document.getElementById('addRole').value = emp.role;
  document.getElementById('addCharacter').value = emp.character;

  document.getElementById('saveEmployeeBtn').onclick = function() {
    emp.firstName = document.getElementById('addFirstName').value.trim();
    emp.lastName = document.getElementById('addLastName').value.trim();
    emp.email = document.getElementById('addEmail').value.trim();
    emp.department = document.getElementById('addDepartment').value.trim();
    emp.role = document.getElementById('addRole').value.trim();
    emp.character = document.getElementById('addCharacter').value.trim();

    if (!emp.firstName || !emp.lastName || !emp.email || !emp.department || !emp.role || !emp.character) {
      alert("All fields are required!");
      return;
    }

    filteredEmployees = [...employees];
    renderEmployees();
    document.getElementById('addForm').classList.add('hidden');
    clearForm();
    resetSaveButton();
  };

  document.getElementById('cancelAddBtn').onclick = () => {
    document.getElementById('addForm').classList.add('hidden');
    clearForm();
    resetSaveButton();
  };
}

function clearForm() {
  document.getElementById('addFirstName').value = '';
  document.getElementById('addLastName').value = '';
  document.getElementById('addEmail').value = '';
  document.getElementById('addDepartment').value = '';
  document.getElementById('addRole').value = '';
  document.getElementById('addCharacter').value = '';
}

function resetSaveButton() {
  document.getElementById('saveEmployeeBtn').onclick = addNewEmployee;
}

function addNewEmployee() {
  const newEmp = {
    id: employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1,
    firstName: document.getElementById('addFirstName').value.trim(),
    lastName: document.getElementById('addLastName').value.trim(),
    email: document.getElementById('addEmail').value.trim(),
    department: document.getElementById('addDepartment').value.trim(),
    role: document.getElementById('addRole').value.trim(),
    character: document.getElementById('addCharacter').value.trim()
  };

  if (!newEmp.firstName || !newEmp.lastName || !newEmp.email || !newEmp.department || !newEmp.role || !newEmp.character) {
    alert("All fields are required!");
    return;
  }

  employees.push(newEmp);
  filteredEmployees = [...employees];
  renderEmployees();
  document.getElementById('addForm').classList.add('hidden');
  clearForm();
}

document.getElementById('addBtn').addEventListener('click', () => {
  document.getElementById('addForm').classList.remove('hidden');
});

document.getElementById('cancelAddBtn').addEventListener('click', () => {
  document.getElementById('addForm').classList.add('hidden');
  clearForm();
  resetSaveButton();
});

document.getElementById('saveEmployeeBtn').onclick = addNewEmployee;

document.getElementById('searchInput').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  filteredEmployees = employees.filter(emp =>
    emp.firstName.toLowerCase().includes(query) ||
    emp.lastName.toLowerCase().includes(query) ||
    emp.email.toLowerCase().includes(query)
  );
  renderEmployees();
});

document.getElementById('filterBtn').addEventListener('click', () => {
  document.getElementById('filterSidebar').classList.remove('hidden');
});

document.getElementById('closeFilterBtn').addEventListener('click', () => {
  document.getElementById('filterSidebar').classList.add('hidden');
});

document.getElementById('applyFilterBtn').addEventListener('click', () => {
  const fname = document.getElementById('filterFirstName').value.toLowerCase();
  const dept = document.getElementById('filterDepartment').value.toLowerCase();
  const role = document.getElementById('filterRole').value.toLowerCase();
  filteredEmployees = employees.filter(emp =>
    (fname ? emp.firstName.toLowerCase().includes(fname) : true) &&
    (dept ? emp.department.toLowerCase().includes(dept) : true) &&
    (role ? emp.role.toLowerCase().includes(role) : true)
  );
  renderEmployees();
  document.getElementById('filterSidebar').classList.add('hidden');
});

document.getElementById('sortSelect').addEventListener('change', function() {
  const sortBy = this.value;
  filteredEmployees.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  renderEmployees();
});


window.onload = renderEmployees;
