const RunningAlgorithmManager = {
    currentAlgorithmOptions: {},
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
        this.currentAlgorithm = algorithmOptions;
    },
    /**
     * Stop the current algorithm
     */
    stopCurrentAlgorithm: function () {
        this.currentAlgorithmOptions.cancelled = true;
    }

}

export default RunningAlgorithmManager;