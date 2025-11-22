<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>地球板塊移動歷史</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
            font-family: Arial, sans-serif;
        }
        #container {
            position: relative;
            width: 100vw;
            height: 100vh;
        }
        #infoPanel {
            position: absolute;
            top: 20px;
            left: 20px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 15px;
            border-radius: 8px;
            max-width: 300px;
            z-index: 100;
        }
        #timeline {
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            z-index: 100;
        }
        #eraLabel {
            text-align: center;
            color: white;
            margin-bottom: 10px;
            font-size: 18px;
            text-shadow: 1px 1px 2px black;
        }
        input[type="range"] {
            width: 100%;
        }
        button {
            background: #4a6fa5;
            color: white;
            border: none;
            padding: 8px 15px;
            margin: 5px;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background: #3a5a8a;
        }
        #controls {
            position: absolute;
            top: 20px;
            right: 20px;
            z-index: 100;
        }
    </style>
</head>
<body>
    <div id="container">
        <div id="infoPanel">
            <h2>地球板塊移動歷史</h2>
            <p>使用時間軸選擇不同年代，查看地球板塊位置變化。</p>
            <div id="currentEraInfo">
                <h3 id="eraName">現代</h3>
                <p id="eraDescription">現代地球板塊分佈</p>
            </div>
        </div>
        
        <div id="controls">
            <button id="autoRotate">暫停旋轉</button>
            <button id="resetView">重置視角</button>
        </div>
        
        <div id="timeline">
            <div id="eraLabel">現代 (0 百萬年前)</div>
            <input type="range" id="eraSlider" min="0" max="12" value="0" step="1">
            <div style="display: flex; justify-content: space-between; color: white;">
                <span>現代</span>
                <span>6500萬年前</span>
                <span>2億年前</span>
                <span>4億年前</span>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.min.js"></script>
    <script>
        // 初始化場景
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        document.getElementById('container').appendChild(renderer.domElement);
        
        // 添加軌道控制器
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        
        // 設置相機位置
        camera.position.z = 5;
        
        // 添加光源
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 3, 5);
        scene.add(directionalLight);
        
        // 創建地球
        let earth;
        let currentTexture;
        let autoRotate = true;
        
        // 年代數據
        const eras = [
            { name: "現代", year: "0", description: "現代地球板塊分佈" },
            { name: "上新世", year: "5", description: "大陸位置接近現代，巴拿馬地峽形成" },
            { name: "中新世", year: "23", description: "大陸持續漂移，地中海形成" },
            { name: "始新世", year: "56", description: "印度板塊與亞洲碰撞，喜馬拉雅山開始形成" },
            { name: "白堊紀", year: "100", description: "恐龍時代晚期，大西洋持續擴張" },
            { name: "侏羅紀", year: "200", description: "盤古大陸開始分裂，大西洋開始形成" },
            { name: "三疊紀", year: "250", description: "盤古大陸形成，所有陸地連成一體" },
            { name: "二疊紀", year: "300", description: "盤古大陸逐漸形成" },
            { name: "石炭紀", year: "360", description: "大陸碰撞形成阿帕拉契山脈和瓦里斯坎山脈" },
            { name: "泥盆紀", year: "416", description: "勞倫大陸與波羅的大陸碰撞" },
            { name: "志留紀", year: "444", description: "大陸逐漸聚集" },
            { name: "奧陶紀", year: "488", description: "岡瓦納大陸位於南極地區" },
            { name: "寒武紀", year: "542", description: "早期地球板塊分佈" }
        ];
        
        // 初始化地球
        function initEarth() {
            const geometry = new THREE.SphereGeometry(2, 64, 64);
            const textureLoader = new THREE.TextureLoader();
            
            // 加載現代地球紋理
            textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg', function(texture) {
                const material = new THREE.MeshPhongMaterial({
                    map: texture,
                    specular: new THREE.Color(0x333333),
                    shininess: 5
                });
                
                earth = new THREE.Mesh(geometry, material);
                scene.add(earth);
                
                currentTexture = texture;
            });
        }
        
        // 更新地球紋理基於選定年代
        function updateEarthTexture(eraIndex) {
            if (!earth) return;
            
            const textureLoader = new THREE.TextureLoader();
            const era = eras[eraIndex];
            
            // 這裡應該根據年代加載不同的紋理
            // 由於我們沒有真實的歷史地球紋理，這裡使用模擬方法
            // 實際應用中，這裡應該加載對應年代的板塊分佈圖
            
            // 模擬不同年代的顏色變化
            const hue = 0.5 - (eraIndex / eras.length) * 0.4; // 從藍色到綠色變化
            const color = new THREE.Color().setHSL(hue, 0.7, 0.4);
            
            earth.material.color = color;
            earth.material.needsUpdate = true;
            
            // 更新信息面板
            document.getElementById('eraName').textContent = era.name;
            document.getElementById('eraDescription').textContent = era.description;
            document.getElementById('eraLabel').textContent = ${era.name} (${era.year} 百萬年前);
        }
        
        // 動畫循環
        function animate() {
            requestAnimationFrame(animate);
            
            if (earth && autoRotate) {
                earth.rotation.y += 0.001;
            }
            
            controls.update();
            renderer.render(scene, camera);
        }
        
        // 事件監聽
        document.getElementById('eraSlider').addEventListener('input', function(e) {
            const eraIndex = parseInt(e.target.value);
            updateEarthTexture(eraIndex);
        });
        
        document.getElementById('autoRotate').addEventListener('click', function() {
            autoRotate = !autoRotate;
            this.textContent = autoRotate ? '暫停旋轉' : '開始旋轉';
        });
        
        document.getElementById('resetView').addEventListener('click', function() {
            controls.reset();
        });
        
        // 響應窗口大小變化
        window.addEventListener('resize', function() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        // 初始化
        initEarth();
        animate();
    </script>
</body>
</html>
