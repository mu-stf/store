// app.js — Optimized Store Logic
const sampleProducts = [
  { id: 'p1', title: 'توزيعات بخور ملكي', price: 5000, category: 'توزيعات', thumb: 'https://images.unsplash.com/photo-1628144450171-ec59a117cb83?q=80&w=400', active: true },
  { id: 'p2', title: 'مصحف الجيب مغلف', price: 7500, category: 'توزيعات', thumb: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=400', active: true },
  { id: 'p3', title: 'سبحة العقيق الفاخرة', price: 15000, category: 'توزيعات', thumb: 'https://images.unsplash.com/photo-1590074259010-8636cb077e69?q=80&w=400', active: true },
  { id: 'p4', title: 'مجموعة بخور وعود', price: 25000, category: 'هدايا', thumb: 'https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?q=80&w=400', active: true },
  { id: 'p13', title: 'علبة هدايا خشبية محفورة', price: 12500, category: 'توزيعات', thumb: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=400', active: true },
  { id: 'p5', title: 'مصحف مخملي كبير', price: 35000, category: 'مصاحف', thumb: 'https://images.unsplash.com/photo-1597933534024-bcbb64dfd6f6?q=80&w=400', active: true },
  { id: 'p6', title: 'حامل مصحف خشبي', price: 45000, category: 'هدايا', thumb: 'https://images.unsplash.com/photo-1584281729155-320077819323?q=80&w=400', active: true },
  { id: 'p7', title: 'طقم صلاة متكامل', price: 65000, category: 'هدايا', thumb: 'https://images.unsplash.com/photo-1564683214965-3619add9800d?q=80&w=400', active: true },
  { id: 'p14', title: 'مصحف بالتجليد الذهبي', price: 55000, category: 'مصاحف', thumb: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=400', active: true },
  { id: 'p8', title: 'قنينة عطر زيتية فخمة', price: 12000, category: 'هدايا', thumb: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=400', active: true },
  { id: 'p9', title: 'علبة هدايا مطرزة', price: 8500, category: 'توزيعات', thumb: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=400', active: true },
  { id: 'p10', title: 'فانوس رمضاني يدوي', price: 18000, category: 'هدايا', thumb: 'https://images.unsplash.com/photo-1558227691-41ea78d1f631?q=80&w=400', active: true },
  { id: 'p11', title: 'لوحة آية الكرسي مذهبة', price: 95000, category: 'هدايا', thumb: 'https://images.unsplash.com/photo-1510522134121-2238418b53c3?q=80&w=400', active: true },
  { id: 'p12', title: 'سجادة صلاة طبية', price: 40000, category: 'مصاحف', thumb: 'https://images.unsplash.com/photo-1554433607-66b5efe9d304?q=80&w=400', active: true },
  { id: 'p15', title: 'صندوق بخور الصندل', price: 17000, category: 'توزيعات', thumb: 'https://images.unsplash.com/photo-1628144450171-ec59a117cb83?q=80&w=400', active: true },
  { id: 'p16', title: 'مجموعة الأذكار الفاخرة', price: 9000, category: 'هدايا', thumb: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=400', active: true },
  { id: 'p17', title: 'بساط صلاة أثري', price: 120000, category: 'مصاحف', thumb: 'https://images.unsplash.com/photo-1554433607-66b5efe9d304?q=80&w=400', active: true },
  { id: 'p18', title: 'مبخرة نحاسية يدوية', price: 32000, category: 'هدايا', thumb: 'https://images.unsplash.com/photo-1541675154750-0444c7d51e8e?q=80&w=400', active: true },
  { id: 'p19', title: 'طقم سبحة ومصحف جيب', price: 14000, category: 'توزيعات', thumb: 'https://images.unsplash.com/photo-1590074259010-8636cb077e69?q=80&w=400', active: true },
  { id: 'p20', title: 'درع آية الكرسي كريستال', price: 85000, category: 'هدايا', thumb: 'https://images.unsplash.com/photo-1510522134121-2238418b53c3?q=80&w=400', active: true }
];

async function loadProducts() {
  const root = document.getElementById('products');
  if (root) root.innerHTML = '<div style="text-align:center; padding: 40px; color: var(--primary); width:100%;"><i class="fa-solid fa-circle-notch fa-spin"></i> جارٍ تحميل متجر غريم...</div>';

  let products = sampleProducts;

  // Try to load from Supabase first
  if (window.supabase) {
    try {
      const { data } = await supabase.from('stickers').select('*').eq('active', true);
      if (data && data.length > 0) {
        products = data.map(p => ({
          id: p.id, title: p.title, price: p.price,
          thumb: p.image_url || 'https://via.placeholder.com/400?text=Gharim',
          category: p.category || '',
          quantity: p.quantity ?? 0, // Include quantity
          description: p.description || '' // Include description
        }));
      }
    } catch (e) { console.warn('Supabase offline, using samples'); }
  }

  // Always ensure stickers_local is populated with sample products for offline access
  const localStickers = JSON.parse(localStorage.getItem('stickers_local') || '[]');
  if (!localStickers.length) {
    localStorage.setItem('stickers_local', JSON.stringify(sampleProducts));
  }

  window._allProducts = products;
  renderProducts(products);
  buildCategories(products);
}

function renderProducts(items) {
  const root = document.getElementById('products');
  const tpl = document.getElementById('productTpl');
  if (!root || !tpl) return;
  root.innerHTML = '';

  if (!items.length) {
    root.innerHTML = '<div style="width:100%; text-align:center; padding:40px;">لا توجد مواد تطابق بحثك.</div>';
    return;
  }

  items.forEach(p => {
    const node = tpl.content.cloneNode(true);
    const img = node.querySelector('.thumb');
    img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='; // placeholder
    img.setAttribute('data-src', p.thumb);
    img.classList.add('lazy');

    node.querySelector('.title').textContent = p.title;
    node.querySelector('.price').textContent = `${p.price.toLocaleString()} د.ع`;

    // Set detail link for image
    const detailLink = node.querySelector('.detailLink');
    detailLink.href = `product.html?id=${encodeURIComponent(p.id)}`;

    // Check if product is out of stock
    const quantity = p.quantity ?? 100; // Default to 100 if not set (for old products)
    const addBtn = node.querySelector('.addBtn');

    if (quantity === 0) {
      // Product is out of stock
      addBtn.textContent = 'نفذ المخزون 📦';
      addBtn.disabled = true;
      addBtn.style.background = '#cccccc';
      addBtn.style.cursor = 'not-allowed';
      addBtn.style.opacity = '0.6';
    }

    // Quantity Controls Logic
    const qtyInput = node.querySelector('.qty-input');
    const plus = node.querySelector('.plus');
    const minus = node.querySelector('.minus');

    plus.onclick = () => { qtyInput.value = parseInt(qtyInput.value) + 1; };
    minus.onclick = () => { if (parseInt(qtyInput.value) > 1) qtyInput.value = parseInt(qtyInput.value) - 1; };

    if (quantity > 0) {
      addBtn.onclick = () => {
        const qty = parseInt(qtyInput.value) || 1;
        addToCart(p, qty);
      };
    }

    root.appendChild(node);
  });

  if (window.refreshGSAP) window.refreshGSAP();
  initLazyLoading();
}

function buildCategories(products) {
  const sel = document.getElementById('categoryFilter');
  if (!sel) return;
  const cats = [...new Set(products.map(p => p.category).filter(Boolean))];
  sel.innerHTML = '<option value="">كل التصنيفات</option>' + cats.map(c => `<option value="${c}">${c}</option>`).join('');
}

function initLazyLoading() {
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const i = e.target;
        i.src = i.getAttribute('data-src');
        i.classList.remove('lazy');
        o.unobserve(i);
      }
    });
  }, { rootMargin: '100px' });
  document.querySelectorAll('img.lazy').forEach(img => obs.observe(img));
}

// Cart Logic
function getCart() { return JSON.parse(localStorage.getItem('cart_stickers') || '[]'); }
function saveCart(c) { localStorage.setItem('cart_stickers', JSON.stringify(c)); updateCartCount(); }

function addToCart(p, qty = 1) {
  const c = getCart();
  const existing = c.find(x => x.id === p.id);
  if (existing) existing.qty += qty; else c.push({ ...p, qty: qty });
  saveCart(c);
  showToast(`تمت إضافة ${qty} من ${p.title} ✅`);
}

function updateCartCount() {
  const el = document.getElementById('cartCount');
  if (el) el.textContent = getCart().reduce((s, i) => s + i.qty, 0);
}

function showCart() {
  const m = document.getElementById('cartModal');
  const list = document.getElementById('cartItems');
  const c = getCart();
  if (!m || !list) return;

  if (!c.length) {
    list.innerHTML = '<p style="text-align:center; padding:20px;">العلاگه فارغة 🛍️</p>';
    document.getElementById('clearCartBtn').style.display = 'none';
  } else {
    document.getElementById('clearCartBtn').style.display = 'block';
    const total = c.reduce((s, i) => s + i.price * i.qty, 0);
    list.innerHTML = c.map(i => `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; padding:15px; border-bottom:1px solid #eee; background: #f9f9f9; border-radius: 10px;">
        <div style="display:flex; align-items:center; gap:15px; flex: 1;">
          <button onclick="removeFromCart('${i.id}')" style="background:none; border:none; color:#ff4444; cursor:pointer; font-size:1.1rem;"><i class="fa-solid fa-trash-can"></i></button>
          <div style="flex: 1;">
            <strong style="display:block; color:var(--primary); margin-bottom: 5px;">${i.title}</strong>
            <div style="display: flex; align-items: center; gap: 10px; margin-top: 8px;">
              <button onclick="updateCartQty('${i.id}', -1)" style="width: 30px; height: 30px; border-radius: 6px; border: 1px solid var(--border-color); background: white; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--primary); font-weight: bold;">-</button>
              <span style="min-width: 40px; text-align: center; font-weight: 700; font-size: 16px;">${i.qty}</span>
              <button onclick="updateCartQty('${i.id}', 1)" style="width: 30px; height: 30px; border-radius: 6px; border: 1px solid var(--border-color); background: white; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--primary); font-weight: bold;">+</button>
              <small style="margin-right: 10px; color: var(--text-light);">× ${i.price.toLocaleString()} د.ع</small>
            </div>
          </div>
        </div>
        <strong style="color: var(--secondary); font-size: 18px;">${(i.price * i.qty).toLocaleString()}</strong>
      </div>`).join('')
      + `<div style="text-align:center; font-size:1.3rem; padding:20px; font-weight:800; color:var(--primary);">المجموع: ${total.toLocaleString()} د.ع</div>`;
  }
  m.classList.add('visible');
  m.hidden = false;
}

function closeCart() {
  const m = document.getElementById('cartModal');
  if (m) {
    m.classList.remove('visible');
    m.hidden = true;
  }
}

window.removeFromCart = function (id) {
  let c = getCart();
  c = c.filter(x => x.id !== id);
  saveCart(c);
  showCart();
  showToast('تم حذف المنتج من العلاگه 🗑️');
};

window.updateCartQty = function (id, delta) {
  let c = getCart();
  const item = c.find(x => x.id === id);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      c = c.filter(x => x.id !== id);
      showToast('تم حذف المنتج من العلاگه 🗑️');
    } else {
      showToast('تم تحديث الكمية ✅');
    }
    saveCart(c);
    showCart();
  }
};

function clearCart() {
  if (confirm('هل أنت متأكد من رغبتك في تفريغ العلاگه بالكامل؟')) {
    saveCart([]);
    showCart();
    showToast('تم تفريغ العلاگه بالكامل 🛍️✨');
  }
}

// Add event listener for clear button
document.addEventListener('DOMContentLoaded', () => {
  const clearBtn = document.getElementById('clearCartBtn');
  if (clearBtn) clearBtn.addEventListener('click', clearCart);
});

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.hidden = false;
  setTimeout(() => t.hidden = true, 3000);
}

// Global Wires
document.addEventListener('DOMContentLoaded', () => {
  const search = document.getElementById('searchInput');
  const cat = document.getElementById('categoryFilter');
  const clear = document.getElementById('clearFilters');

  if (search) search.oninput = () => {
    const q = search.value.toLowerCase();
    renderProducts(window._allProducts.filter(p => p.title.toLowerCase().includes(q)));
  };

  if (cat) cat.onchange = () => {
    const c = cat.value;
    renderProducts(c ? window._allProducts.filter(p => p.category === c) : window._allProducts);
  };

  if (clear) clear.onclick = () => {
    if (search) search.value = '';
    if (cat) cat.value = '';
    renderProducts(window._allProducts);
  };

  document.addEventListener('click', (e) => {
    if (e.target.id === 'cartBtn' || e.target.closest('#cartBtn')) showCart();
    else if (e.target.id === 'closeCart') closeCart();
    else if (e.target.id === 'checkout') { document.getElementById('checkoutModal')?.classList.add('active'); closeCart(); }
  });

  const form = document.getElementById('checkoutForm');
  if (form) form.onsubmit = async (e) => {
    e.preventDefault();
    const cart = getCart();
    const orderData = {
      items: cart,
      total: cart.reduce((s, i) => s + i.price * i.qty, 0),
      name: document.getElementById('cust_name').value,
      phone: document.getElementById('cust_phone').value,
      city: document.getElementById('cust_city').value,
      address: document.getElementById('cust_address').value,
      created_at: new Date().toISOString()
    };

    if (window.supabase) await supabase.from('orders').insert([orderData]);
    else {
      const local = JSON.parse(localStorage.getItem('local_orders') || '[]');
      local.unshift({ id: Date.now(), ...orderData });
      localStorage.setItem('local_orders', JSON.stringify(local));
    }

    saveCart([]);
    document.getElementById('checkoutModal')?.classList.remove('active');
    form.reset();

    // WhatsApp Integration
    const waNumber = '9647835345474'; // Formatted from 07835345474
    let itemsText = cart.map(i => `- ${i.title} (${i.qty} قِطعة)`).join('%0A');
    const msg = `🏰 *طلب جديد من متجر غريم*%0A%0A` +
      `👤 *الاسم:* ${orderData.name}%0A` +
      `📞 *الهاتف:* ${orderData.phone}%0A` +
      `📍 *العنوان:* ${orderData.city} - ${orderData.address}%0A%0A` +
      `📦 *المنتجات:*%0A${itemsText}%0A%0A` +
      `💰 *المجموع:* ${orderData.total.toLocaleString()} د.ع%0A%0A` +
      `✨ شكراً لاختياركم متجر غريم!`;

    window.open(`https://wa.me/${waNumber}?text=${msg}`, '_blank');
    showToast('🏰 تم إرسال طلبك عبر الواتساب بنجاح!');
  };

  loadProducts();
  updateCartCount();
});

window.closeCheckout = () => document.getElementById('checkoutModal')?.classList.remove('active');
window.addToCart = addToCart; // Global access for click events if needed
