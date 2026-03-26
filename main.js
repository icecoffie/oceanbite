 // Array global untuk menyimpan data barang yang dibeli
        let cart = [];

        // Daftar 16 menu (untuk efisiensi coding)
        const menuData = [
            { id: 1, name: 'Gurame Bakar Jimbaran', price: 85000, img: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=400' },
            { id: 2, name: 'Udang Saus Padang', price: 65000, img: 'https://images.unsplash.com/photo-1559742811-822873691df0?w=400' },
            { id: 3, name: 'Cumi Goreng Tepung', price: 45000, img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400' },
            { id: 4, name: 'Lobster Garlic Butter', price: 175000, img: 'https://images.unsplash.com/photo-1551739440-5dd934d3a94a?w=400' },
            { id: 5, name: 'Kakap Tim Nyonya', price: 95000, img: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400' },
            { id: 6, name: 'Kerang Dara Rebus', price: 35000, img: 'https://images.unsplash.com/photo-1623961988350-66b064cb2977?w=400' },
            { id: 7, name: 'Kepiting Telur Asin', price: 120000, img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400' },
            { id: 8, name: 'Ikan Pari Bakar', price: 55000, img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400' },
            { id: 9, name: 'Sate Cumi Madu', price: 48000, img: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400' },
            { id: 10, name: 'Sup Ikan Tomyam', price: 60000, img: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=400' },
            { id: 11, name: 'Ikan Nila Bakar', price: 42000, img: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400' },
            { id: 12, name: 'Kerapu Saus Tiram', price: 110000, img: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400' },
            { id: 13, name: 'Udang Bakar Kecap', price: 75000, img: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=400' },
            { id: 14, name: 'Cah Kangkung Seafood', price: 30000, img: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=400' },
            { id: 15, name: 'Ikan Bawal Bakar', price: 68000, img: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=400' },
            { id: 16, name: 'Kerang Hijau Nanas', price: 40000, img: 'https://images.unsplash.com/photo-1563245339-dfc20ca69a2d?w=400' }
        ];

        // 1. Fungsi Render Menu ke Layar (Inisialisasi)
        function initMenu() {
            const container = document.getElementById('menu-container');
            container.innerHTML = menuData.map(item => `
                <div class="menu-card reveal">
                    <div class="card-img-container"><img src="${item.img}" alt="${item.name}"></div>
                    <div class="card-content">
                        <h3>${item.name}</h3>
                        <span class="card-price">Rp ${item.price.toLocaleString('id-ID')}</span>
                        <button class="btn-add" onclick="addToCart('${item.name}', ${item.price})">Tambah</button>
                    </div>
                </div>
            `).join('');
        }

        // 2. Fungsi Tambah ke Keranjang
        // Kita mencocokkan nama barang. Jika sudah ada, qty bertambah. Jika tidak, tambah objek baru.
        function addToCart(name, price) {
            const existing = cart.find(item => item.name === name);
            if(existing) {
                existing.qty++;
            } else {
                cart.push({ name, price, qty: 1 });
            }
            updateCartUI(); // Update tampilan keranjang setiap ada data baru
            notify(`${name} ditambah!`);
        }

        // 3. Fungsi Render Tampilan Keranjang (BAGIAN YANG DIPERBAIKI)
        // Fungsi ini akan menghapus isi list lama dan menggantinya dengan data terbaru dari array 'cart'
        function updateCartUI() {
            const list = document.getElementById('cartList');
            const totalBox = document.getElementById('cartTotal');
            const badge = document.getElementById('cart-counter');
            
            list.innerHTML = ""; // Bersihkan list
            let totalHarga = 0;
            let totalBarang = 0;

            cart.forEach((item, index) => {
                totalHarga += item.price * item.qty;
                totalBarang += item.qty;

                // Membuat elemen per baris di dalam modal
                const row = document.createElement('div');
                row.className = 'cart-row';
                row.innerHTML = `
                    <div>
                        <strong style="display:block;">${item.name}</strong>
                        <small>${item.qty} x Rp ${item.price.toLocaleString('id-ID')}</small>
                    </div>
                    <button class="btn-remove" onclick="remove(${index})">HAPUS</button>
                `;
                list.appendChild(row);
            });

            // Tampilkan pesan kosong jika keranjang tidak ada isinya
            if(cart.length === 0) {
                list.innerHTML = '<p style="text-align: center; opacity: 0.5;">Belum ada pesanan...</p>';
            }

            // Update info ringkasan
            totalBox.innerText = `Rp ${totalHarga.toLocaleString('id-ID')}`;
            badge.innerText = totalBarang;
        }

        // 4. Fungsi Hapus Barang (Splice berdasarkan urutan index)
        function remove(idx) {
            cart.splice(idx, 1);
            updateCartUI(); // Render ulang setelah dihapus
        }

        // 5. Fungsi UI: Toggle (Buka/Tutup) Modal
        function toggleCart() {
            const m = document.getElementById('modalOverlay');
            m.style.display = (m.style.display === 'flex') ? 'none' : 'flex';
        }

        // 6. Fungsi UI: Tampilkan Alamat jika memilih Delivery
        function toggleAddr() {
            const method = document.getElementById('method').value;
            document.getElementById('addrBox').style.display = (method === 'delivery') ? 'block' : 'none';
        }

        // 7. Animasi Scroll (Reveal)
        function handleScroll() {
            const reveals = document.querySelectorAll('.reveal');
            reveals.forEach(el => {
                const windowH = window.innerHeight;
                const top = el.getBoundingClientRect().top;
                if(top < windowH - 100) el.classList.add('active');
            });
        }

        // 8. Fungsi Checkout (Selesai Pesan)
        function checkout() {
            const name = document.getElementById('custName').value;
            if(!cart.length) return alert("Pilih menu dulu!");
            if(!name) return alert("Isi nama dulu!");

            document.querySelector('.modal-content').innerHTML = `
                <div style="text-align:center; margin:auto;">
                    <h1 style="font-size:5rem;">🌊</h1>
                    <h2 style="color:var(--primary); font-weight:800;">Pesanan Sukses!</h2>
                    <p>Terima kasih <strong>${name}</strong>, pesananmu sedang kami siapkan.</p>
                    <button class="btn btn-primary" style="margin-top:2rem;" onclick="location.reload()">Selesai</button>
                </div>
            `;
        }

        // 9. Toast Notification sederhana
        function notify(msg) {
            const t = document.createElement('div');
            t.innerText = msg;
            t.style.cssText = `position:fixed; bottom:30px; right:30px; background:var(--text-dark); color:white; padding:15px 30px; border-radius:100px; z-index:3000; font-weight:700; animation: slideUp 0.4s ease-out;`;
            document.body.appendChild(t);
            setTimeout(() => t.remove(), 2500);
        }

        // Inisialisasi saat web dibuka
        window.addEventListener('scroll', handleScroll);
        window.onload = () => {
            initMenu();
            handleScroll();
        };

        function handleRes(e) {
            e.preventDefault();
            alert("Reservasi berhasil dicatat! Tim kami akan menghubungi Anda.");
            e.target.reset();
        }
