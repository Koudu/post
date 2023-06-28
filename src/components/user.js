export function renderUser(user) {
  // return JSON.stringify(user, null, 2);
  return `
  <div class="info">
    <h2 class="username">${user.username}</h2>
    <h2 class="name">Name: ${user.name}</h2>
    <h3 class="email">Email: ${user.email}</h3>
    <h3 class="phone">Phone: ${user.phone}</h3>

    <h3 class="city">City: ${user.address.city}</h3>
    <h3 class="street">Street: ${user.address.street}</h3>

    <h3 class="company">Company: ${user.company.name}</h3>
  </div>
  `;
}
