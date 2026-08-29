function initDropdown(triggerId, menuId, selectedId) {
    const trigger = document.getElementById(triggerId);
    const menu = document.getElementById(menuId);
    const selected = selectedId ? document.getElementById(selectedId) : null;

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close all other menus first
        document.querySelectorAll('.dropdown-menu').forEach(m => {
            if (m !== menu) {
                m.classList.remove('open');
                const t = m.previousElementSibling;
                if (t) {
                    t.setAttribute('aria-expanded', false);
                    const ch = t.querySelector('.dropdown-chevron');
                    if (ch) ch.style.transform = '';
                }
            }
        });
        const isOpen = menu.classList.toggle('open');
        trigger.setAttribute('aria-expanded', isOpen);
        trigger.querySelector('.dropdown-chevron').style.transform = isOpen ? 'rotate(180deg)' : '';
    });

    menu.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            if (selected) {
                const label = item.dataset.value ||
                    (item.dataset.sort.charAt(0).toUpperCase() + item.dataset.sort.slice(1));
                const img = item.querySelector('.league-logo');
                if (img) {
                    selected.innerHTML = `<img class="league-logo" src="${img.src}" alt="${label}" onerror="this.style.display='none'"> ${label}`;
                } else {
                    selected.textContent = label;
                }
            }
            menu.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            menu.classList.remove('open');
            trigger.setAttribute('aria-expanded', false);
            trigger.querySelector('.dropdown-chevron').style.transform = '';
            if (item.dataset.sort) sortCards(item.dataset.sort);
        });
    });
}

function sortCards(by) {
    const list = document.querySelector('.match-list');
    const cards = [...list.querySelectorAll('.match-card')];

    cards.sort((a, b) => {
        if (by === 'date') {
            const da = a.querySelector('.td-date').textContent.trim().split('.').reverse().join('');
            const db = b.querySelector('.td-date').textContent.trim().split('.').reverse().join('');
            return da.localeCompare(db);
        }
        if (by === 'time') {
            const toMins = t => {
                const parts = t.trim().split(' ');
                const period = parts[1];
                let [h, m] = parts[0].split(':').map(Number);
                if (period === 'PM' && h !== 12) h += 12;
                if (period === 'AM' && h === 12) h = 0;
                return h * 60 + m;
            };
            return toMins(a.querySelector('.td-time').textContent) -
                toMins(b.querySelector('.td-time').textContent);
        }
        return 0;
    });

    cards.forEach(c => list.appendChild(c));
}

// Close all dropdowns on outside click
document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu').forEach(m => {
        m.classList.remove('open');
        const t = m.previousElementSibling;
        if (t) {
            t.setAttribute('aria-expanded', false);
            const ch = t.querySelector('.dropdown-chevron');
            if (ch) ch.style.transform = '';
        }
    });
});

// Init dropdown
initDropdown('dropdown-trigger', 'dropdown-menu', 'dropdown-selected');
