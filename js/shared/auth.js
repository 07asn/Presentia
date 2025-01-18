// Import Firebase modules
import { auth } from './config.js';
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

/**
 * Logs out the currently authenticated user.
 */
export async function logoutUser() {
    try {
        console.log("Attempting to sign out...");
        await signOut(auth); // This should sign out the user from Firebase
        console.log("User successfully signed out.");
        window.location.href = '/Presentia/html/login.html'; // Redirect to login
    } catch (error) {
        console.error("Error during logout:", error.message);
        alert(`Logout failed: ${error.message}`);
    }
}


/**
 * Checks the current authentication state and executes a callback.
 * @param {function} callback - The function to call when auth state changes.
 */
export function monitorAuthState(callback) {
    onAuthStateChanged(auth, (user) => {
        callback(user); // Pass the user object (or null if no user)
    });
}

/**
 * Redirects users based on their authentication state.
 * @param {string} loggedInRedirect - The URL to redirect logged-in users.
 * @param {string} loggedOutRedirect - The URL to redirect logged-out users.
 */
export function handleAuthRedirection(loggedInRedirect, loggedOutRedirect) {
    monitorAuthState((user) => {
        if (user) {
            // User is logged in
            if (window.location.pathname !== loggedInRedirect) {
                window.location.href = loggedInRedirect;
            }
        } else {
            // User is not logged in
            if (window.location.pathname !== loggedOutRedirect) {
                window.location.href = loggedOutRedirect;
            }
        }
    });
}