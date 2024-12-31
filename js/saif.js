function createTree(data, containerId, width = 800, height = 500) {
       const container = document.getElementById(containerId);
       if (!container) {
              console.error(`Container with ID '${containerId}' not found.`);
              return;
       }

       const svg = d3.select(`#${containerId}`).append("svg")
              .attr("width", width)
              .attr("height", height)
              .append("g")
              .attr("transform", `translate(${width / 2}, 50)`);

       const treeLayout = d3.tree().size([width - 200, height - 100]);
       const root = d3.hierarchy(data);
       treeLayout(root);

       // Draw tree links (branches)
       svg.selectAll(".tree-link")
              .data(root.links())
              .enter()
              .append("path")
              .attr("class", "tree-link")
              .attr("d", d3.linkVertical().x(d => d.x - width / 2).y(d => d.y))
              .attr("stroke", " #E0F7FC")
              .attr("stroke-width", 2)
              .attr("fill", "none")
              .on("mouseover", function () {
                     d3.select(this)
                            .attr("stroke", " #E0F7FC")
                            .attr("stroke-width", 6);
              })
              .on("mouseout", function () {
                     d3.select(this)
                            .attr("stroke", "#fff")
                            .attr("stroke-width", 2);
              });

       // Draw tree nodes (points and labels)
       const node = svg.selectAll(".tree-node")
              .data(root.descendants())
              .enter()
              .append("g")
              .attr("class", "tree-node")
              .attr("transform", d => `translate(${d.x - width / 2}, ${d.y})`);

       // Add text boxes and labels
       const textNodes = node.append("text")
              .attr("x", 0)
              .attr("y", 15)
              .style("text-anchor", "middle")
              .style("font-family", "Cairo, sans-serif")
              .style("font-size", "12px")
              .style("fill", "#333")
              .text(d => d.data.name);

       // Add background rectangles for labels
       textNodes.each(function () {
              const bbox = this.getBBox(); // Get bounding box of text
              d3.select(this.parentNode)
                     .insert("rect", "text")
                     .attr("class", "text-box")
                     .attr("x", bbox.x - 15) // Adjust for more padding horizontally
                     .attr("y", bbox.y - 8) // Adjust for more padding vertically
                     .attr("width", bbox.width + 30) // Increase width for larger box
                     .attr("height", bbox.height + 16) // Increase height for larger box
                     .attr("rx", 10)
                     .attr("ry", 10)
                     // .attr("fill", "#000")
                     // .attr("stroke", "#ddd");
       });
}

// Tree data for the first tree
const data1 = {
       "name": "",
       "children": [
              { "name": "فقدان الوظائف" },
              { "name": "التحيز والتمييز" },
              { "name": "مخاوف الخصوصية" },
              { "name": "مخاطر الأمان" },
              { "name": "نقص الذكاء العاطفي" },
              { "name": "القضايا الأخلاقية" },
       ]
};

// Tree data for the second tree
const data2 = {
       "name": "",
       "children": [
              { "name": "تحليل البيانات" },
              { "name": "التكيف السريع" },
              { "name": "إدارة الموارد" },
              { "name": "التعلم الآلي" },
              { "name": "تحسين الكفاءة" },
       ]
};

// Create the trees
createTree(data1, "tree-section1", 1200);
createTree(data2, "tree-section2", 1200);

// Variables
const tabs = document.querySelectorAll('.tab');

// Functions
const toggleTab = (event) => {
       event.currentTarget.classList.toggle('active');
};

// Event Listeners
tabs.forEach((tab) => {
       tab.addEventListener('click', toggleTab);
});


const api = '#';
const inp = document.getElementById('inp');
const images = document.querySelector('.images');

const getImage = async () => {
       try {
              // التحقق من أن المدخلات ليست فارغة
              if (!inp.value.trim()) {
                     alert("من فضلك أدخل نصًا.");
                     return;
              }

              // إعداد الطلب
              const method = {
                     method: "POST",
                     headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${api}`,
                     },
                     body: JSON.stringify({
                            "prompt": inp.value,
                            "n": 3,
                            "size": "256x256",
                     }),
              };

              // إرسال الطلب
              const res = await fetch('https://api.openai.com/v1/images/generations', method);

              // التحقق من صحة الاستجابة
              if (!res.ok) {
                     throw new Error('فشل في تحميل الصور');
              }

              // تحويل الاستجابة إلى JSON
              const data = await res.json();

              // التحقق من وجود البيانات
              if (!data || !data.data) {
                     throw new Error('استجابة غير صالحة من الخادم');
              }

              const listImages = data.data;

              // مسح الصور السابقة قبل إضافة الجديدة
              images.innerHTML = '';

              // إضافة الصور الجديدة
              listImages.forEach(photo => {
                     const container = document.createElement("div");
                     images.append(container);
                     const img = document.createElement("img");
                     container.append(img);
                     img.src = photo.url;
              });
       } catch (error) {
              console.error("خطأ:", error);
              alert("حدث خطأ. من فضلك حاول مرة أخرى.");
       }
};


/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
       origin: 'top',
       distance: '60px',
       duration: 2000,
       delay: 200,
       //     reset: true
});


// - home__data
//        - home__img
//        - home__social - icon
//        - about__img
//        - about__subtitle
//        - about__text
//        - skills__subtitle
//        - skills__text
//        - skills__img
//        - skills__data
//        - work__img
//        - contact__input

sr.reveal('.hero, .main-container2, .skills__subtitle, .skills__text', {});
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 400 });
sr.reveal('.home__social-icon', { interval: 200 });
sr.reveal('.skills__data, .work__img, .contact__input', { interval: 200 }); 
