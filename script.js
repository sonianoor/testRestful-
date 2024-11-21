// Initialize data array from localStorage or empty array
let users = JSON.parse(localStorage.getItem('users')) || [];

// DOM elements
const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');
const submitBtn = document.getElementById('submitBtn');

// Display users
function displayUsers() {
    userList.innerHTML = '';
    users.forEach((user, index) => {
        userList.innerHTML += `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button class="edit-btn" onclick="editUser(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteUser(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Add/Update user
userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const userId = document.getElementById('userId').value;

    if(userId === '') {
        // Create new user
        users.push({
            name: name,
            email: email
        });
    } else {
        // Update existing user
        users[parseInt(userId)] = {
            name: name,
            email: email
        };
    }

    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // Reset form
    userForm.reset();
    document.getElementById('userId').value = '';
    submitBtn.textContent = 'Add User';
    
    // Refresh display
    displayUsers();
});

// Edit user
function editUser(index) {
    const user = users[index];
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('userId').value = index;
    submitBtn.textContent = 'Update User';
}

// Delete user
function deleteUser(index) {
    if(confirm('Are you sure you want to delete this user?')) {
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        displayUsers();
    }
}

// Initial display
displayUsers();

