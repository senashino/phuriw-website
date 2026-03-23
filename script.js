document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('lightbox');
    const modalImg = document.getElementById('lightboxImg');
    const captionText = document.getElementById('caption');
    const closeBtn = document.getElementById('closeLightbox');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    

    const images = document.querySelectorAll('.gallery-img');
    
    let currentIndex = 0;

    //ปิดหน้าต่าง Lightbox
    function openLightbox(index) {
        modal.style.display = 'block'; // แสดง Modal
        modalImg.src = images[index].src; // ดึง URL รูปที่คลิกมาใส่ในป๊อปอัป
        captionText.innerHTML = images[index].alt; // ดึงข้อความ alt มาเป็นแคปชั่น
        currentIndex = index;
        
        // ซ่อน Scrollbar ของหน้าเว็บหลักเพื่อไม่ให้เลื่อนจอตอนดูรูป
        document.body.style.overflow = 'hidden'; 
    }

    //ปิดหน้าต่าง Lightbox
    function closeLightbox() {
        modal.style.display = 'none'; // ซ่อน Modal
        document.body.style.overflow = 'auto'; // นำ Scrollbar กลับมา
    }

    //ปลี่ยนรูปภาพ (เลื่อนซ้าย/ขวา)
    function changeImage(step) {
        currentIndex += step;
        
        // ถ้ารูปเลยตำแหน่งสุดท้าย ให้วนกลับมาแสดงรูปแรก
        if (currentIndex >= images.length) {
            currentIndex = 0;
        }
        // ถ้ากดถอยหลังจากรูปแรก ให้วนไปแสดงรูปลำดับสุดท้าย
        if (currentIndex < 0) {
            currentIndex = images.length - 1;
        }
        
        modalImg.src = images[currentIndex].src;
        captionText.innerHTML = images[currentIndex].alt;
    }
    
    // วนลูปเพื่อเพิ่ม Event การคลิกให้กับรูปภาพทุกรูปใน Gallery
    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);


    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeLightbox();
        }
    });

    nextBtn.addEventListener('click', () => changeImage(1));
    prevBtn.addEventListener('click', () => changeImage(-1));

    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') changeImage(1);
            if (e.key === 'ArrowLeft') changeImage(-1);
        }
    });
});