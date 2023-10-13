const RunningAlgorithmManager = {
    currentAlgorithmOptions: {
        cancelled: false
    },
    /**
     * Save the current algorithm options
     * 
     * This allows the algorithm to later be stopped if it is still running
     * 
     * @param {Object} algorithmOptions 
     * @param {Boolean} algorithmOptions.cancelled 
     */
    trackAlgorithmOptions: function (algorithmOptions) {
        this.stopCurrentAlgorithm();
        this.currentAlgorithmOptions = algorithmOptions;
        this.currentAlgorithmOptions.cancelled = false;
    },
    /**
     * Stop the current algorithm
     */
    stopCurrentAlgorithm: function () {
        this.currentAlgorithmOptions.cancelled = true;
        setTimeout(() => {
            this.currentAlgorithmOptions.cancelled = false;
        }, 200);
    }

}

export default RunningAlgorithmManager;