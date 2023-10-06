const RunningAlgorithmManager = {
    currentAlgorithmOptions: {},
    currentAlgorithm: null,
    trackAlgorithm: function (algorithm) {
        console.log("track", algorithm);
        this.currentAlgorithm = algorithm;
    },
    stopAlgorithm: function () {
        console.log("stop", this.currentAlgorithm);
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