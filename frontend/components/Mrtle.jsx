import React, { useState, useEffect } from 'react'


const Mrtle = () => {
    const [guesses, setGuesses] = useState([])
    const [attempts, setAttempts] = useState(0)
    const [input, setInput] = useState('');
    const [stations, setStations] = useState([]);
    const [filteredStations, setFilteredStations] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [error, setError] = useState(null)
    const [gameOver, setGameOver] = useState(false)

    const handleGuess = async () => {
        if (gameOver) return;
        const response = await fetch(`${import.meta.env.VITE_LOCAL_HOST}/station/guess`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                station_name: input
            })
        });

        const json = await response.json()
        console.log(json)
        if (!response.ok) {
            setError(json.detail); 
        } else if ((guesses.map(guess => guess["station"])).includes(json.name)) {
            setError("You have already guessed this station!")
        } else {
            setAttempts(attempts + 1)
            const newGuess = {
                "station": json.name,
                "line": json.lines,
                "interchange": json.is_interchange,
               "region": json.region,
                "correct": json.is_correct,
                "attempt": attempts
            }
            console.log(newGuess)
            setGuesses([...guesses, newGuess]);
            setInput('');
            setError(null)
            if (json.is_correct) setGameOver(true);
        }   
    }

    const getHintIcon = (isCorrect) => (
        isCorrect ? <span className="text-green-500">✔️</span> : <span className="text-gray-500 border border-gray-500 rounded px-2">❔</span>
    );

    // Fetch all stations from the backend
    useEffect(() => {
        const fetchStations = async () => {
            const response = await fetch(`${import.meta.env.VITE_LOCAL_HOST}/station/stations`, {
            method: 'GET',
            credentials: 'include',
        })
            const json = await response.json()
            if (!response.ok) {
                setError(json.detail);
            } else {
                let names = json.stations.map(station => station.name)
                setStations(names)
            }
        };
        fetchStations()
    }, []);

    useEffect(() => {
        if (input.trim() === "") {
            setFilteredStations([]);
            setShowDropdown(false);
        } else {
            const filtered = stations.filter(station => 
                station.toLowerCase().includes(input.toLowerCase()));
            setFilteredStations(filtered);
            setShowDropdown(filtered.length > 0);
            
            
        }
    }, [input, stations])

    const handleSelect = (station) => {
        setInput(station);
        setShowDropdown(false);
      };
      
    return (
        <div className="flex flex-col items-center mt-10 gap-4">
            {guesses.map((guess, index) => (
                <div key={index} className="w-80 border p-2 rounded-md shadow-sm">
                    <div className="text-lg font-bold">{guess["station"]}</div>
                    <div className="flex justify-around mt-2">
                        <div className="flex flex-col items-center">
                            {getHintIcon(guess["correct"])}
                            <div className="text-xs">Station</div>
                        </div>
                        <div className="flex flex-col items-center">
                            {getHintIcon(guess["line"])}
                            <div className="text-xs">Line</div>
                        </div>
                        <div className="flex flex-col items-center">
                            {getHintIcon(guess["interchange"])}
                            <div className="text-xs">Interchange</div>
                        </div>
                        <div className="flex flex-col items-center">
                            {getHintIcon(guess["region"])}
                            <div className="text-xs">Region</div>
                        </div>
                    </div>
                </div>
            ))}
            {!gameOver && (
                <div className="flex">
                    <div className="relative w-80">
                        {/* Input box */}
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter station name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
                            maxLength={20}
                        />
                    
                        {/* Dropdown */}
                        {showDropdown && (
                            <ul className="absolute top-[100%] left-0 w-full border border-gray-300 bg-white max-h-64 overflow-y-auto shadow-lg z-50 rounded-md">
                            {filteredStations.sort().map((station) => (
                                <li
                                key={station}
                                onClick={() => handleSelect(station)}
                                className="px-4 py-2 cursor-pointer hover:bg-green-100 text-sm"
                                >
                                {station}
                                </li>
                            ))}
                            </ul>
                        )}
                    </div>
                        <button onClick={handleGuess} className="bg-green-500 text-white mx-4 px-4 py-2.5 my-1 rounded text-sm">Guess</button>
                        {error && <div className="py-2.5 my-1 px-2 max-w-sm border text-sm rounded-md text-red-500 border-red-500 bg-red-100 break-words">{error}</div>}
                </div>
            )}
            {gameOver && (
                <div className="mt-10 mb-50 text-green-600 font-bold">
                    🎉 Correct! You've guessed the MRT station! 🚇 Come back again tomorrow!
                </div>
            )}
        </div>
    )
}

export default Mrtle