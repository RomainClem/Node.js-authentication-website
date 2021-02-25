module.exports = (role) => {
    return role === 'Admin' ? 'admin'
        : role === 'Guest' ? 'contact'
        : role === 'Ordinary' ? 'about'
        : 'home';
}
