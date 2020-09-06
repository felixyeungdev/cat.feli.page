const MODEL_URL = "./assets/models/cats/";
const webCamContainer = document.querySelector("#webcam");
const startButton = document.querySelector("#start");
const goButton = document.querySelector("#go");
const resultElement = document.querySelector("#result");
const camerasSelect = document.querySelector("#cameras");
const version = "v1.0";

let model, webcam, maxPredictions;

let screens = ["welcome", "camera-picker", "ml"];

function loadVersion() {
    document.querySelector(
        "#version"
    ).innerHTML = `cat.feli.page<br/>${version}`;
}
loadVersion();

async function showScreen(screenId) {
    document.querySelector(`#${screenId}`).classList.add("show");
    let filteredScreens = [...screens].filter((screen) => screen != screenId);
    filteredScreens.forEach((screen) =>
        document.querySelector(`#${screen}`).classList.remove("show")
    );
}

async function init(deviceId) {
    showScreen("ml");

    const modelURL = MODEL_URL + "model.json";
    const metadataURL = MODEL_URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const flip = false;
    webcam = new tmImage.Webcam(200, 200, flip);
    await webcam.setup({ deviceId });
    await webcam.play();
    // window.requestAnimationFrame(loop);
    setInterval(loop, 200);

    webCamContainer.appendChild(webcam.canvas);
}

async function loop() {
    webcam.update();
    await predict();
    // window.requestAnimationFrame(loop);
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    var sorted = prediction.sort((a, b) => {
        if (a.probability > b.probability) {
            return -1;
        }
        if (a.probability < b.probability) {
            return 1;
        }
        return 0;
    });

    var top = sorted[0];

    resultElement.innerHTML = `I am <span>${(top.probability * 100).toFixed(
        0
    )}</span>% sure that's ${top.className}`;
    // for (let i = 0; i < maxPredictions; i++) {
    //     const classPrediction =
    //         prediction[i].className +
    //         ": " +
    //         prediction[i].probability.toFixed(2);
    //     labelContainer.childNodes[i].innerHTML = classPrediction;
    // }
}

async function chooseCamera() {
    let webcam = new tmImage.Webcam(200, 200, false);
    await webcam.setup();
    showScreen("camera-picker");
    camerasSelect.innerHTML = "";
    var devices = await navigator.mediaDevices.enumerateDevices();
    var videoInputs = devices.filter((device) => device.kind == "videoinput");

    videoInputs.forEach((device) => {
        let option = document.createElement("option");
        option.value = device.deviceId;
        option.textContent = device.label;
        camerasSelect.append(option);
    });

    goButton.addEventListener("click", (e) => {
        if (camerasSelect.value && camerasSelect.value != "")
            init(camerasSelect.value);
    });
}

startButton.addEventListener("click", chooseCamera);
