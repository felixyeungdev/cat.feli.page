const MODEL_URL = "./assets/models/cats/";
const webCamContainer = document.querySelector("#webcam");
const startButton = document.querySelector("#start");
const goButton = document.querySelector("#go");
const backButton = document.querySelector("#back");
const resultElement = document.querySelector("#result");
const camerasSelect = document.querySelector("#cameras");
const imageUploadInput = document.querySelector("#image_upload");
const version = "v1.1.9";

let model, webcam, maxPredictions, mobilenetModel;

let screens = ["welcome", "camera-picker", "ml"];

async function getCamera() {
    return new Promise((resolve, reject) => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia(
                { audio: false, video: { width: 1280, height: 720 } },
                function (stream) {
                    resolve(stream);
                },
                function (err) {
                    reject("The following error occurred: " + err.name);
                }
            );
        } else if (navigator.getUserMedia) {
            navigator.getUserMedia(
                { audio: false, video: { width: 1280, height: 720 } },
                function (stream) {
                    resolve(stream);
                },
                function (err) {
                    reject("The following error occurred: " + err.name);
                }
            );
        } else {
            reject("getUserMedia not supported");
        }
    });
}

async function closeCamera(stream) {
    stream.getTracks().forEach(function (track) {
        track.stop();
    });
}

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

async function init(deviceId, useCamera = true) {
    resultElement.innerHTML = "Initialising...";

    if (!mobilenetModel) mobilenetModel = await mobilenet.load();

    showScreen("ml");

    const modelURL = MODEL_URL + "model.json";
    const metadataURL = MODEL_URL + "metadata.json";

    if (!model) model = await tmImage.load(modelURL, metadataURL);

    // maxPredictions = model.getTotalClasses();

    if (useCamera) {
        const flip = false;
        webcam = new tmImage.Webcam(200, 200, flip);
        await webcam.setup({ deviceId });
        await webcam.play();
        window.requestAnimationFrame(loop);
        // loop();
        // setInterval(loop, 500);
        webCamContainer.innerHTML = "";
        webCamContainer.appendChild(webcam.canvas);
    }
    resultElement.innerHTML = "Identifying...";
}

async function loop() {
    webcam.update();
    await predict();

    window.requestAnimationFrame(loop);
}

async function predict(element) {
    var mobilenetClassify = await mobilenetModel.classify(
        webcam ? webcam.canvas : element
    );

    var isCat =
        mobilenetClassify.filter((e) =>
            e.className.toLowerCase().includes("cat")
        ).length > 0;

    if (!isCat) {
        resultElement.innerHTML = `That's not a cat! That's a <br/>${
            mobilenetClassify[0].className.split(", ")[0]
        }`;
        return;
    }

    const prediction = await model.predict(webcam ? webcam.canvas : element);
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
    )}</span>% sure that's <br/>${top.className}`;
    // for (let i = 0; i < maxPredictions; i++) {
    //     const classPrediction =
    //         prediction[i].className +
    //         ": " +
    //         prediction[i].probability.toFixed(2);
    //     labelContainer.childNodes[i].innerHTML = classPrediction;
    // }
}

async function chooseCamera() {
    // let tempStream = await getCamera();
    // closeCamera(tempStream);

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
        // if (camerasSelect.value && camerasSelect.value != "")
        init(camerasSelect.value);
    });
}

startButton.addEventListener("click", chooseCamera);

document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("click", async () => {
        webCamContainer.innerHTML = `<img src="${image.src}"></img>`;
        showScreen("ml");
        backButton.style.display = "grid";
        resultElement.innerHTML = "Identifying...";
        await init(null, false);
        predict(image);
    });
});

imageUploadInput.addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();

        reader.onload = async (e) => {
            webCamContainer.innerHTML = `<img src="${e.target.result}"></img>`;
            showScreen("ml");
            backButton.style.display = "grid";
            resultElement.innerHTML = "Identifying...";
            await init(null, false);
            const image = webCamContainer.querySelector("img");
            predict(image);
        };

        reader.readAsDataURL(e.target.files[0]);
    }
});

backButton.addEventListener("click", (e) => {
    showScreen("camera-picker");
    backButton.style.display = "none";
});
backButton.style.display = "none";

showScreen("camera-picker");
