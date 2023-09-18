
import { ReactComponent as MazeIcon } from "./maze.svg";
import { ReactComponent as NoiseIcon } from "./noise.svg";

/**
 * Returns the icon component for the given svg-icon name. 
 * 
 * If the icon name is not found, null is returned.
 * 
 * @param {string} name the icon name
 * @returns {JSX.Element} the icon component
 */
export default function getIcon(name) {
    switch (name) {
        case "maze":
        return <MazeIcon className="icon"/>;
        case "noise":
        return <NoiseIcon className="icon"/>;
        default:
        return null;
    }
}
