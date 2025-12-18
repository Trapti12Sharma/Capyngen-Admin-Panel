// TEMP SIMPLE AUTH (replace with backend later)

export async function loginAdmin({ email, password }) {
  // ✅ TEMP credentials
  const ADMIN_EMAIL = "admin@capyngen.com";
  const ADMIN_PASSWORD = "Admin@123";

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem("adminLoggedIn", "true");
        resolve(true);
      } else {
        reject(false);
      }
    }, 800);
  });
}

export function isAdminLoggedIn() {
  return localStorage.getItem("adminLoggedIn") === "true";
}

export function logoutAdmin() {
  localStorage.removeItem("adminLoggedIn");
}
