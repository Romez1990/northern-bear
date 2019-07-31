const links = document.querySelectorAll<HTMLElement>('header li');

links.forEach((link: HTMLElement): void => {
    link.addEventListener('click', (): void => {
        const hash = link.dataset.sectionId || '';
        if (window.location.hash === hash) window.location.hash = '#';
        window.location.hash = hash;
    });
});
