import React from 'react';
import ButtonBox from "../../../controll-components/button-box/ButtonBox";
import "./AlgoQuickaccess.scss";

export default function AlgoQuickaccess(props) { 
    const { algo, data } = props;
    return (
        <div className="algo-display-canvas-overlay-quickaccess">
          <ButtonBox
            icon={"fa-solid fa-play"}
            title={"Run"}
            onClick={() => {
              algo.controls.run.action(data, algo.options);
            }}
          />
          <ButtonBox
            icon={"fa-solid fa-stop"}
            title={"Stop"}
            onClick={() => {
              algo.controls.stop.action(data);
            }}
          />
          <ButtonBox
            icon={"fa-solid fa-undo"}
            title={"Reset"}
            onClick={() => {
              algo.controls.reset.action(data);
            }}
          />
        </div>
        )
}