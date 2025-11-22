// 初始化Three.js场景
let scene, camera, renderer, earth, controls;
let autoRotate = true;

// 年代数据
const eras = [
    { name: "现代", year: "0", description: "现代地球板块分布" },
    { name: "上新世", year: "5", description: "大陆位置接近现代，巴拿马地峡形成" },
    { name: "中新世", year: "23", description: "大陆持续漂移，地中海形成" },
    { name: "始新世", year: "56", description: "印度板块与亚洲碰撞，喜马拉雅山开始形成" },
    { name: "白垩纪", year: "100", description: "恐龙时代晚期，大西洋持续扩张" },
    { name: "侏罗纪", year: "200", description: "盘古大陆开始分裂，大西洋开始形成" },
    { name: "三叠纪", year: "250", description: "盘古大陆形成，所有陆地连成一体" },
    { name: "二叠纪", year: "300", description: "盘古大陆逐渐形成" },
    { name: "石炭纪", year: "360", description: "大陆碰撞形成阿帕拉契山脉和瓦里斯坎山脉" },
    { name: "泥盆纪", year: "416", description: "劳伦大陆与波罗的大陆碰撞" },
    { name: "志留纪", year: "444", description: "大陆逐渐聚集" },
    { name: "奥陶纪", year: "488", description: "冈瓦纳大陆位于南极地区" },
    { name: "寒武纪", year: "542", description: "早期地球板块分布" }
];

// 初始化函数
function init() {
    // 创建场景
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000010);
    
    // 创建相机
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('container').appendChild(renderer.domElement);
    
    // 添加轨道控制器
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // 添加光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    // 创建星空背景
    createStarfield();
    
    // 创建地球
    createEarth();
    
    // 添加事件监听器
    setupEventListeners();
    
    // 开始动画循环
    animate();
}

// 创建星空背景
function createStarfield() {
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 5000;
    const positions = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 2000;
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1,
        sizeAttenuation: true
    });
    
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}

// 创建地球
function createEarth() {
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    
    // 创建基础材质
    const material = new THREE.MeshPhongMaterial({
        color: 0x4a9df0,
        specular: new THREE.Color(0x333333),
        shininess: 5
    });
    
    earth = new THREE.Mesh(geometry, material);
    scene.add(earth);
    
    // 初始化地球纹理
    updateEarthTexture(0);
}

// 更新地球纹理基于选定年代
function updateEarthTexture(eraIndex) {
    if (!earth) return;
    
    const era = eras[eraIndex];
    
    // 模拟不同年代的颜色变化
    // 实际应用中，这里应该加载对应年代的板块分布图
    const hue = 0.5 - (eraIndex / eras.length) * 0.4; // 从蓝色到绿色变化
    const color = new THREE.Color().setHSL(hue, 0.7, 0.4);
    
    earth.material.color = color;
    earth.material.needsUpdate = true;
    
    // 更新信息面板
    document.getElementById('eraName').textContent = era.name;
    document.getElementById('eraDescription').textContent = era.description;
    document.getElementById('eraLabel').textContent = ${era.name} (${era.year} 百万年前);
}

// 设置事件监听器
function setupEventListeners() {
    // 时间轴滑块
    document.getElementById('eraSlider').addEventListener('input', function(e) {
        const eraIndex = parseInt(e.target.value);
        updateEarthTexture(eraIndex);
    });
    
    // 自动旋转按钮
    document.getElementById('autoRotate').addEventListener('click', function() {
        autoRotate = !autoRotate;
        this.textContent = autoRotate ? '暂停旋转' : '开始旋转';
    });
    
    // 重置视角按钮
    document.getElementById('resetView').addEventListener('click', function() {
        controls.reset();
    });
    
    // 全屏按钮
    document.getElementById('fullscreen').addEventListener('click', function() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(全屏请求错误: ${err.message});
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });
    
    // 窗口大小调整
    window.addEventListener('resize', onWindowResize);
}

// 窗口大小调整处理
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    
    if (earth && autoRotate) {
        earth.rotation.y += 0.001;
    }
    
    controls.update();
    renderer.render(scene, camera);
}

// 当页面加载完成后初始化
window.addEventListener('load', init);
