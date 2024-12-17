const backgroundMusic = new Audio('background-music.mp3');
backgroundMusic.loop = true;

document.getElementById('fullscreenBtn').addEventListener('click', () => {
    backgroundMusic.play();     if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

document.getElementById('startGameBtn').addEventListener('click', () => {
    backgroundMusic.pause();     document.getElementById('welcomeScreen').style.display = 'none';     document.body.setAttribute('aria-hidden', 'false'); });

document.body.setAttribute('aria-hidden', 'true');

const fullscreenBtn = document.getElementById('fullscreenBtn');
const addPointsBtn = document.getElementById('addPoints');
const teamSelect = document.getElementById('teamSelect');
const pointsInput = document.getElementById('points');

const teams = {
    1: {
        name: "רימון",
        score: 0,
        sound: new Audio('sound1.mp3'),
        image: 'rimon.png'
    },
    2: {
        name: "סביון",
        score: 0,
        sound: new Audio('sound2.mp3'),
        image: 'savion.png'
    },
    3: {
        name: "זית",
        score: 0,
        sound: new Audio('sound3.mp3'),
        image: 'zait.png'
    }
};
const victorySound = new Audio('victory.mp3');

function addPoints() {
    const teamId = teamSelect.value;
    const points = parseInt(pointsInput.value);

    if (points < 0 || points > 72) return; 
    if (teams[teamId]) {
        teams[teamId].score = Math.min(teams[teamId].score + points, 72);         updateScoreDisplay(teamId);
        animateCandleFill(`fill${teamId}`, teams[teamId].score);
        showBubble(`bubble${teamId}`, points);
        teams[teamId].sound.play();

                if (teams[teamId].score === 72) {
            showVictoryScreen();
        }
    }
}

function updateScoreDisplay(teamId) {
    const scoreElement = document.getElementById(`score${teamId}`);
    scoreElement.textContent = teams[teamId].score;
}

function animateCandleFill(fillId, score) {
    const fillElement = document.getElementById(fillId);
    const targetHeight = (score / 72) * 100;
    let currentHeight = parseFloat(fillElement.style.height) || 0;

    const interval = setInterval(() => {
        if (currentHeight < targetHeight) {
            currentHeight += 1;
            fillElement.style.height = currentHeight + '%';

            if (currentHeight > 58) {
                fillElement.style.background = 'green';
            } else if (currentHeight > 40) {
                fillElement.style.background = 'yellow';
            } else {
                fillElement.style.background = 'red';
            }
        } else {
            clearInterval(interval);
        }
    }, 20);
}

function showBubble(bubbleId, points) {
    const bubbleElement = document.getElementById(bubbleId);
    bubbleElement.textContent = `+${points}`;
    bubbleElement.style.opacity = 1;

    bubbleElement.classList.remove("bubble");
    void bubbleElement.offsetWidth;
    bubbleElement.classList.add("bubble");
}

function showVictoryScreen() {
    const sortedTeams = Object.keys(teams)
        .map(id => ({ id, ...teams[id] }))
        .sort((a, b) => b.score - a.score);

    const victoryScreen = document.createElement("div");
    victoryScreen.id = "victoryScreen";
    victoryScreen.innerHTML = `
        <div class="victory-container">
            <h1>תוצאות מאסטר שף</h1>
            <div class="first-place">
                <h2>🥇 מקום ראשון: קבוצת ${sortedTeams[0].name} - ${sortedTeams[0].score} נקודות</h2>
                <img src="${sortedTeams[0].image}" alt="תמונת קבוצת ${sortedTeams[0].name}" class="team-image first-place-image" />
            </div>
            <div class="second-place">
                <h3>🥈 מקום שני: קבוצת ${sortedTeams[1].name} - ${sortedTeams[1].score} נקודות</h3>
                <img src="${sortedTeams[1].image}" alt="תמונת קבוצת ${sortedTeams[1].name}" class="team-image second-place-image" />
            </div>
            <div class="second-place">
            <h3>🥉 מקום שלישי: קבוצת ${sortedTeams[2].name} - ${sortedTeams[2].score} נקודות</h3>
            <img src="${sortedTeams[2].image}" alt="תמונת קבוצת ${sortedTeams[2].name}" class="team-image second-place-image" />
        </div>
            <button id="restartBtn">התחל משחק חדש</button>
        </div>
    `;
    document.body.appendChild(victoryScreen);

    victorySound.play();

    document.getElementById("restartBtn").addEventListener("click", () => location.reload());

    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    }
}


addPointsBtn.addEventListener('click', event => {
    event.preventDefault();
    addPoints();
});

fullscreenBtn.addEventListener('click', event => {
    event.preventDefault();
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});
