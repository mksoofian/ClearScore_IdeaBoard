import { useEffect, useState } from "react";
import { css } from "@emotion/react";
// import Tile from "./components/tile";
import "./App.css";

function App() {
  // Initialization  ------------------------------------------------------------
  // Load data from localStorage on initial render
  useEffect(() => {
    const storedTiles = JSON.parse(localStorage.getItem("arrTiles"));
    if (storedTiles) {
      setArrTiles(storedTiles);
      console.log(
        `Stored Tiles! ${JSON.stringify(localStorage.getItem("arrTiles"))}`
      );
    }
  }, []);

  // State  ------------------------------------------------------------
  const [arrTiles, setArrTiles] = useState([]); //For managing Tiles
  const [text, setText] = useState(""); //For Character Counter
  const [sortAz, setSortAz] = useState(0); //For Alphabetic Sorting Function
  const [sortDate, setSortDate] = useState(0); //For Date Sorting Function

  // Save the updated tiles to local storage whenever arrTiles changes
  useEffect(() => {
    localStorage.setItem("arrTiles", JSON.stringify(arrTiles));
    console.log(
      `Setting arrTiles ${JSON.stringify(localStorage.getItem("arrTiles"))}`
    );
  }, [arrTiles]);

  // CRUD Operations and Handlers ---------------------------
  // Create
  const handleCreateCard = () => {
    const newTimeStamp = new Date();
    let createTimeStamp = newTimeStamp.toLocaleTimeString();

    const newTile = {
      id: arrTiles.length
        ? Math.max(...arrTiles.map((tile) => tile.id)) + 1
        : 1,
      titleValue: "New Card",
      createdAt: `Created at: ${createTimeStamp}`,
      textLength: 0,
    };
    setArrTiles([...arrTiles, newTile]);
    // Save the updated tiles to local storage
    localStorage.setItem("arrTiles", JSON.stringify(arrTiles));
  };

  // Update
  // Function to update Character Count + Time Stamps onChange + Animation Alerts
  const handleDescriptionChange = (event, tileId) => {
    const newText = event.target.value;
    const charCount = newText.length;
    // Update the text state variable
    setText(newText);
    setArrTiles((prevArrTiles) => {
      // Create a copy of the previous array
      const updatedArrTiles = [...prevArrTiles];
      // Update the textLength property of the specific tile ---- Character Count Updating Function
      updatedArrTiles[tileId - 1].textLength = charCount;
      // Update the CharCount color to alert user approaching limit ---- Character Count Alert Function
      charCount >= 130; // Charcount
      // Update the createdAt property of the specific tile   ---- Time Stamp Updating
      updatedArrTiles[
        tileId - 1
      ].createdAt = `Updated at: ${new Date().toLocaleTimeString()}`;

      // Animate the text color change   ---- Time Stamp Alert Updating
      const targetTimeStamp = document.getElementById(`timeStamp_${tileId}`);
      if (targetTimeStamp) {
        targetTimeStamp.style.transition = "background-color 2s ease-in-out"; // Set transition properties
        targetTimeStamp.style.backgroundColor = "yellow"; // Initial color before animation
        setTimeout(() => {
          targetTimeStamp.style.backgroundColor = "initial"; // Final color after animation
        }, 1500); // Matches the transition duration
      }
      // Animate the text color change   ---- Character Count Alert Updating
      const targetCharCounter = document.getElementById(
        `charCounterLimit_${tileId}`
      );
      if (targetCharCounter && charCount >= 130) {
        targetCharCounter.style.color = "red"; // Set alert text color
      } else targetCharCounter.style.color = "inherit"; // Revert to correct font-color

      // Return the updated array to be set as the new state
      return updatedArrTiles;
    });
  };
  // Function to update Title in state onChange to prep for Sorting Titles Alphabetically
  const handleTitleChange = (event, tileId) => {
    const newText = event.target.value;
    setArrTiles((prevArrTiles) => {
      // Create a copy of the previous array
      const updatedArrTiles = [...prevArrTiles];
      // Update the titleValue property of the specific tile   ---- Title Updating
      updatedArrTiles[tileId - 1].titleValue = newText;
      // Update the createdAt property of the specific tile   ---- Time Stamp Updating
      updatedArrTiles[
        tileId - 1
      ].createdAt = `Updated at: ${new Date().toLocaleTimeString()}`;
      // Animate the text color change   ---- Time Stamp Alert Updating
      const targetTimeStamp = document.getElementById(`timeStamp_${tileId}`);
      if (targetTimeStamp) {
        targetTimeStamp.style.transition = "background-color 2s ease-in-out"; // Set transition properties
        targetTimeStamp.style.backgroundColor = "yellow"; // Initial color before animation
        setTimeout(() => {
          targetTimeStamp.style.backgroundColor = "initial"; // Final color after animation
        }, 1500); // Matches the transition duration
      }
      // Return the updated array to be set as the new state
      return updatedArrTiles;
    });
  };

  // Delete
  const handleDeleteTile = (tileId) => {
    const updatedTiles = arrTiles.filter((tile) => tile.id !== tileId);
    setArrTiles(updatedTiles);
  };

  // Sorting Functions ---------------------------
  const handleSortAZ = () => {
    setArrTiles((prevArrTiles) => {
      const sortedArrTiles = [...prevArrTiles];
      if (sortAz == true) {
        setSortAz(false);
        // Sort the array by title in descending order (A-Z)
        sortedArrTiles.sort((a, b) => {
          if (a.titleValue > b.titleValue) return -1;
          if (a.titleValue < b.titleValue) return 1;
          return 0;
        });
      } else {
        setSortAz(true);
        // Sort the array by title in ascending order (A-Z)
        sortedArrTiles.sort((a, b) => {
          if (a.titleValue < b.titleValue) return -1;
          if (a.titleValue > b.titleValue) return 1;
          return 0;
        });
      }
      return sortedArrTiles;
    });
  };
  const handleSort09 = () => {
    setArrTiles((prevArrTiles) => {
      const sortedArrTiles = [...prevArrTiles];
      if (sortDate == true) {
        setSortDate(false);
        // Sort the array by Time in descending order (A-Z)
        sortedArrTiles.sort((a, b) => {
          if (a.createdAt > b.createdAt) return -1;
          if (a.createdAt < b.createdAt) return 1;
          return 0;
        });
      } else {
        setSortDate(true);
        // Sort the array by Time in ascending order (A-Z)
        sortedArrTiles.sort((a, b) => {
          if (a.createdAt < b.createdAt) return -1;
          if (a.createdAt > b.createdAt) return 1;
          return 0;
        });
      }
      return sortedArrTiles;
    });
  };

  //  ------------------------------------------------------
  return (
    <div>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-evenly;
        `}
      >
        <button onClick={handleCreateCard}>Create New Card</button>
        <div
          css={css`
            border: none;
            border-radius: 1em;
            padding: 0.5em;
          `}
        >
          {" "}
          <button
            onClick={handleSortAZ}
            css={css`
              border-radius: 1em 0 0 1em;
            `}
          >
            Sort A-Z
          </button>
          <button
            onClick={handleSort09}
            css={css`
              border-radius: 0 1em 1em 0;
            `}
          >
            Sort by Date
          </button>
        </div>
      </div>
      <div
        className="card-container"
        css={css`
          //   background-color: grey;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-evenly;
        `}
      >
        {arrTiles.map((tile) => (
          <li
            key={tile.id}
            css={css`
              list-style-type: none;
            `}
          >
            {
              <div
                css={css`
                  // background-color: grey;
                  border: 1px solid whitesmoke;
                  border-radius: 1rem;
                  display: flex;
                  flex-direction: column;
                  margin: 2em;
                  gap: 1em;
                  padding: 1.5em;
                `}
              >
                {
                  <>
                    <input
                      type="text"
                      placeholder="Title"
                      onChange={(event) => handleTitleChange(event, tile.id)}
                      css={css`
                        border: none;
                        border-radius: 1em;
                        padding: 0.5em;
                      `}
                      autoFocus
                    ></input>

                    <textarea
                      type="text"
                      placeholder="Description"
                      cols={35}
                      rows={5}
                      maxLength="140"
                      onChange={(event) =>
                        handleDescriptionChange(event, tile.id)
                      }
                      css={css`
                        border: none;
                        border-radius: 1em;
                        padding: 0.5em;
                      `}
                    ></textarea>

                    <div
                      css={css`
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                      `}
                    >
                      {" "}
                      <p
                        id={`timeStamp_${tile.id}`}
                        css={css`
                          font-size: 0.5rem;
                          color: gray;
                        `}
                      >
                        {tile.createdAt}
                      </p>
                      <p
                        id={`charCounterLimit_${tile.id}`}
                        css={css`
                          font-size: 0.5rem;
                          color: gray;
                        `}
                      >
                        {tile.textLength} / 140
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        handleDeleteTile(tile.id);
                        // console.log(tile.id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="35"
                        height="35"
                        viewBox="0 0 100 100"
                      >
                        <path d="M 53.240234 8.6777344 C 52.819005 8.6754234 52.427232 8.7317225 52.085938 8.7792969 C 48.975499 9.2116988 45.907508 9.9268364 42.927734 10.916016 A 1.0001 1.0001 0 0 0 42.925781 10.917969 C 42.436257 11.080802 41.839908 11.273681 41.273438 11.703125 C 40.402154 12.363903 40.001637 13.27146 39.75 14.148438 C 32.989404 14.517546 25.33019 16.098742 19.523438 19.882812 C 18.839285 20.328646 18.134069 20.936586 17.621094 21.714844 C 17.297556 22.205698 17.048061 22.816745 17.019531 23.458984 A 1.0001889 1.0001889 0 0 0 17.009766 23.673828 C 17.159635 25.96673 17.441205 27.99532 17.5625 30.230469 C 17.63508 31.573826 18.357366 32.825257 19.542969 33.515625 A 1.0001 1.0001 0 0 0 19.544922 33.515625 C 20.315972 33.963931 21.171302 34.368646 22.064453 34.654297 C 22.175057 36.648506 22.304193 38.595552 22.419922 40.535156 A 1.0001 1.0001 0 0 0 22.367188 40.548828 C 20.441468 41.117766 18.611299 42.000388 16.96875 43.154297 C 16.464189 43.509121 15.937086 43.964459 15.541016 44.570312 C 15.247074 45.019945 15.109659 45.618137 15.134766 46.238281 A 1.0001 1.0001 0 0 0 15.068359 46.929688 C 15.435489 48.398206 15.803051 49.866503 16.169922 51.333984 C 16.322201 51.944114 16.498999 52.765817 17.158203 53.458984 C 17.751432 54.081643 18.480339 54.321282 19.060547 54.492188 L 19.060547 54.490234 C 20.480009 54.908932 21.914968 55.086548 23.349609 55.130859 C 23.865631 62.495494 24.436333 69.856836 25.066406 77.212891 C 25.257906 79.446377 25.493396 82.079318 27.246094 84.052734 C 27.608532 84.460902 28.023783 84.691206 28.605469 84.994141 C 29.187155 85.297075 29.917037 85.620236 30.785156 85.957031 C 32.521396 86.630622 34.807214 87.357352 37.451172 88.009766 C 39.26143 88.456458 41.246707 88.861715 43.326172 89.193359 A 1.0001 1.0001 0 0 0 43.841797 89.28125 C 47.693626 89.865564 51.870962 90.166566 55.972656 89.904297 C 59.168191 89.69994 61.955044 89.26554 64.421875 88.691406 A 1.0003597 1.0003597 0 0 0 64.679688 88.634766 C 70.357866 87.278572 74.279572 85.168289 77.333984 83.363281 C 78.524037 82.660027 79.302702 81.570162 79.683594 80.3125 C 80.064486 79.054838 80.108789 77.635697 80.015625 76.029297 C 79.829297 72.816497 79.064171 68.807299 78.695312 63.929688 C 78.255257 58.106392 77.815326 52.282683 77.375 46.458984 C 80.692094 45.939715 82.622488 45.107087 84.460938 43.982422 C 84.997281 43.654329 85.322446 43.280295 85.605469 42.777344 C 86.039999 42.003717 85.859406 41.265336 85.761719 40.800781 A 1.0001 1.0001 0 0 0 85.761719 40.798828 C 85.440181 39.283451 84.99225 37.795315 84.423828 36.353516 C 84.392278 36.273596 84.331357 36.068842 84.117188 35.833984 C 83.776359 35.459793 83.418476 35.40889 83.277344 35.373047 C 81.071414 34.816655 78.768411 34.759686 76.513672 35.060547 C 76.442812 34.123004 76.371623 33.18559 76.300781 32.248047 A 1.0001 1.0001 0 0 0 76.248047 31.984375 C 76.488134 31.885815 76.742403 31.796499 76.978516 31.695312 C 78.526301 31.031786 79.494205 29.46109 79.394531 27.78125 C 79.261398 25.519975 79.172869 23.154151 78.931641 20.902344 A 1.0001 1.0001 0 0 0 78.810547 20.511719 C 78.698776 20.119613 78.519012 19.754599 78.292969 19.464844 C 77.776761 18.803138 77.097746 18.330387 76.449219 17.990234 C 74.681534 17.061451 72.825848 16.303051 70.912109 15.728516 C 66.690073 14.460975 62.326895 14.116394 58.072266 13.777344 A 1.0001 1.0001 0 0 0 57.970703 13.773438 A 1.0001 1.0001 0 0 0 57.71875 13.808594 C 57.458771 13.032722 57.174132 12.26598 56.837891 11.519531 C 56.431902 10.619947 55.851208 9.450938 54.574219 8.9296875 C 54.112152 8.7409666 53.661464 8.6800454 53.240234 8.6777344 z M 53.212891 10.689453 C 53.458739 10.69011 53.663426 10.717973 53.818359 10.78125 C 54.25137 10.957999 54.661613 11.557382 55.015625 12.341797 C 55.852245 14.19949 56.421406 16.176991 56.732422 18.191406 C 56.045452 18.170756 55.359035 18.148513 54.673828 18.126953 A 1.0001 1.0001 0 0 0 54.671875 18.126953 C 54.407467 18.119353 54.307064 18.077319 54.353516 18.105469 C 54.376726 18.120629 54.373824 18.178109 54.339844 17.908203 C 54.305534 17.635633 54.326494 17.186341 54.21875 16.642578 A 1.0001 1.0001 0 0 0 54.21875 16.640625 C 53.937688 15.223162 52.757675 14.330172 51.542969 13.998047 C 50.378215 13.679579 49.257373 13.832444 48.285156 13.994141 C 47.533943 14.119065 46.697088 14.334936 45.9375 14.771484 C 45.177912 15.208033 44.452018 15.95164 44.289062 16.988281 C 44.170755 17.743274 44.337712 18.350788 44.390625 18.779297 C 44.443535 19.207806 44.414664 19.315135 44.365234 19.375 C 44.338324 19.40763 44.10071 19.522893 43.675781 19.564453 C 42.692992 19.661053 41.680856 19.545933 40.693359 19.310547 C 40.932206 18.130933 41.173093 16.935165 41.410156 15.771484 C 41.637623 14.658663 41.930183 13.715691 42.482422 13.296875 C 42.717596 13.118589 43.091151 12.969365 43.556641 12.814453 C 46.420867 11.863632 49.371767 11.175364 52.361328 10.759766 C 52.680034 10.715341 52.967042 10.688796 53.212891 10.689453 z M 58.296875 15.804688 C 62.419305 16.134629 66.503542 16.493969 70.335938 17.644531 C 72.126199 18.181996 73.865216 18.892503 75.519531 19.761719 A 1.0001 1.0001 0 0 0 75.521484 19.761719 C 75.974958 19.999566 76.464005 20.371268 76.716797 20.695312 C 76.969589 21.019358 76.987875 21.125315 76.908203 21.308594 C 76.856963 21.424183 76.629034 21.63697 76.230469 21.882812 C 68.850665 26.44002 59.620056 27.092787 50.646484 27.416016 C 40.399104 27.785381 30.013127 27.873558 20.488281 24.673828 C 19.732058 24.419879 19.192924 24.109272 19.060547 23.804688 C 19.035194 23.746375 19.02181 23.685251 19.013672 23.623047 C 19.012738 23.609115 19.010688 23.595976 19.009766 23.582031 C 18.996464 23.377719 19.076027 23.142571 19.291016 22.816406 C 19.587291 22.366914 20.122387 21.879761 20.615234 21.558594 C 25.80039 18.179597 32.901542 16.602897 39.285156 16.1875 C 39.086835 17.167144 38.887398 18.154435 38.689453 19.130859 C 38.498086 20.076569 39.126414 21.003258 40.027344 21.234375 C 41.266779 21.551844 42.569854 21.682586 43.871094 21.554688 C 44.44754 21.498307 45.293317 21.38963 45.90625 20.648438 C 46.481824 19.951301 46.447794 19.108897 46.376953 18.535156 C 46.306113 17.961415 46.231933 17.511882 46.265625 17.296875 C 46.315985 16.979242 46.499308 16.753498 46.933594 16.503906 C 47.368506 16.253955 48.011494 16.066872 48.613281 15.966797 C 49.517065 15.816487 50.344378 15.744199 51.015625 15.927734 C 51.636919 16.097609 52.168875 16.582713 52.257812 17.03125 C 52.299073 17.239487 52.292029 17.654273 52.355469 18.158203 C 52.418909 18.662133 52.638384 19.407886 53.318359 19.818359 A 1.0001 1.0001 0 0 0 53.320312 19.820312 C 53.844144 20.135051 54.323213 20.11872 54.611328 20.126953 C 55.343267 20.149983 56.076594 20.171359 56.808594 20.193359 C 57.118125 20.202359 57.778223 20.275479 58.339844 19.689453 L 58.341797 19.6875 C 58.935889 19.065063 58.795095 18.355779 58.744141 18.009766 A 1.0001 1.0001 0 0 0 58.742188 18.007812 C 58.631642 17.266351 58.474373 16.532717 58.296875 15.804688 z M 77.144531 23.664062 C 77.23736 25.062286 77.315033 26.481803 77.398438 27.898438 C 77.448768 28.746596 76.969668 29.522948 76.189453 29.857422 C 62.566872 35.695399 41.284458 37.04081 24.617188 33.224609 C 24.195777 31.494597 24.231139 28.976277 24.275391 27.820312 C 32.917044 29.862613 41.94536 29.732251 50.71875 29.416016 C 59.683894 29.09309 69.234614 28.488528 77.144531 23.664062 z M 74.332031 32.740234 C 75.121438 43.18736 75.911784 53.634051 76.701172 64.080078 C 77.079314 69.080466 77.844406 73.158581 78.017578 76.144531 C 78.104168 77.637506 78.037578 78.847365 77.769531 79.732422 C 77.501486 80.617478 77.091854 81.184332 76.316406 81.642578 C 75.538063 82.102541 74.69081 82.576688 73.802734 83.050781 C 72.659123 69.409257 71.892717 57.383987 70.316406 43.21875 A 1.0001 1.0001 0 0 0 69.294922 42.316406 A 1.0001 1.0001 0 0 0 68.328125 43.441406 C 69.930145 57.837684 70.688013 70.004531 71.873047 84.015625 C 69.981525 84.908169 67.824603 85.757474 65.234375 86.441406 C 64.523127 77.91964 63.773288 70.584861 63.103516 62.224609 C 62.638515 56.4216 62.173984 50.619397 61.708984 44.816406 A 1.0001 1.0001 0 0 0 60.716797 43.880859 A 1.0001 1.0001 0 0 0 59.714844 44.976562 C 60.179844 50.779573 60.644376 56.581775 61.109375 62.384766 C 61.789672 70.876382 62.550337 78.272568 63.267578 86.910156 C 61.082913 87.376614 58.635205 87.729688 55.84375 87.908203 C 55.47504 87.931779 55.103054 87.93502 54.732422 87.949219 C 54.348151 73.208717 53.048167 59.911526 52.021484 45.880859 A 1.0001 1.0001 0 0 0 51.035156 44.939453 A 1.0001 1.0001 0 0 0 50.027344 46.027344 C 51.055983 60.084763 52.349915 73.337862 52.732422 87.986328 C 50.014531 87.975179 47.294249 87.74682 44.703125 87.376953 C 43.935789 73.102812 43.660505 61.467745 43.136719 45.919922 A 1.0001 1.0001 0 0 0 42.087891 44.941406 A 1.0001 1.0001 0 0 0 41.136719 45.988281 C 41.65478 61.366175 41.93432 72.95256 42.685547 87.058594 C 41.013337 86.768455 39.408747 86.433327 37.929688 86.068359 C 36.495507 85.714467 35.188422 85.337445 34.013672 84.962891 C 33.062448 76.090923 32.242296 63.972866 31.662109 54.162109 C 32.108533 54.068654 32.566501 53.983237 33.005859 53.888672 C 34.316346 53.606617 36.022486 53.250545 37.066406 51.796875 C 37.932507 50.590822 37.987972 48.972032 37.205078 47.710938 C 36.422212 46.449888 34.947012 45.779666 33.482422 46.019531 C 32.997683 46.099059 32.097406 46.288851 31.230469 46.474609 C 31.014689 42.364456 30.890668 39.754688 30.855469 38.984375 C 33.452281 39.248478 36.593467 39.457031 40.179688 39.457031 C 49.214687 39.457031 60.909844 38.160672 72.839844 33.263672 C 72.858507 33.256028 72.870728 33.241046 72.888672 33.232422 C 73.371455 33.069385 73.861772 32.912633 74.332031 32.740234 z M 83.195312 38.941406 C 83.43188 39.690274 83.643767 40.447239 83.806641 41.214844 L 83.804688 41.212891 C 83.886998 41.604335 83.854798 41.808502 83.861328 41.796875 L 83.863281 41.796875 C 83.832301 41.851925 83.427625 42.271437 83.417969 42.277344 C 81.705404 43.324999 80.174747 43.983539 77.222656 44.457031 C 77.126177 43.180962 77.029573 41.904955 76.933594 40.628906 C 79.105518 40.480966 81.24358 39.904585 83.195312 38.941406 z M 33.804688 47.992188 C 34.416097 47.892052 35.178726 48.238674 35.505859 48.765625 C 35.832965 49.292531 35.805258 50.126912 35.443359 50.630859 C 34.953189 51.31403 33.847081 51.661738 32.583984 51.933594 C 28.154625 52.886949 23.663924 53.763623 19.625 52.572266 C 19.139208 52.429171 18.780193 52.26142 18.607422 52.080078 C 18.412626 51.875246 18.257096 51.441479 18.109375 50.849609 A 1.0001 1.0001 0 0 0 18.109375 50.847656 C 17.933628 50.144668 17.757958 49.442746 17.582031 48.740234 C 17.723386 48.779944 17.884823 48.862669 18.015625 48.894531 C 22.490854 49.987616 24.366411 49.771698 29.802734 48.816406 C 30.675331 48.66282 33.166453 48.097044 33.804688 47.992188 z"></path>
                      </svg>
                    </button>
                  </>
                }
              </div>
            }
          </li>
        ))}
      </div>
    </div>
  );
}

export default App;
