export const clickToHide = (
    targetId: string,
    setVisible: (visible: boolean) => void
) => {
    return (e: MouseEvent) => {
        const targetElement = document.getElementById(targetId);

        if (targetElement && !targetElement.contains(e.target as Node)) {
            setVisible(false);
        }
    };
};
