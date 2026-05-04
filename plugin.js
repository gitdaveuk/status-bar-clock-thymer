class Plugin extends AppPlugin {

    onLoad() {
        this.statusBarItem = this.ui.addStatusBarItem({
            icon: 'clock',
            label: '--:--',
            tooltip: 'Current time',
            onClick: () => this.showDateTimeDetails()
        });

        this.updateClock();
        this.clockInterval = setInterval(() => this.updateClock(), 1000);
    }

    onUnload() {
        clearInterval(this.clockInterval);
        this.statusBarItem?.remove();
    }

    updateClock() {
        const now = new Date();
        const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const date = now.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

        this.statusBarItem.setLabel(time);
        this.statusBarItem.setTooltip(`${date}\n${time}`);
    }

    showDateTimeDetails() {
        const now = new Date();
        const time = now.toLocaleTimeString('en-GB');
        const date = now.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const week = this.getWeekNumber(now);

        this.ui.addToaster({
            title: time,
            message: `${date}\nWeek ${week} of ${now.getFullYear()}`,
            dismissible: true,
            autoDestroyTime: 4000
        });
    }

    getWeekNumber(date) {
        const start = new Date(date.getFullYear(), 0, 1);
        const dayOfYear = Math.floor((date - start) / 86400000);
        return Math.ceil((dayOfYear + start.getDay() + 1) / 7);
    }
}
