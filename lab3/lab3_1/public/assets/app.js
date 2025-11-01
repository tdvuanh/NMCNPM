// =========================
// Helpers
// =========================
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const money = (n) => Number(n || 0).toLocaleString("vi-VN");
const showToast = (msg) => {
  const el = $("#toast");
  $("#toastMsg").textContent = msg || "Thao tác thành công";
  el.classList.remove("hidden");
  setTimeout(() => el.classList.add("hidden"), 1600);
};

// =========================
// Storage
// =========================
const KEY = "products_store_v1";
const store = {
  all() {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  },
  save(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
  },
  upsert(item) {
    const list = this.all();
    const idx = list.findIndex((x) => x.id === item.id || x.sku === item.sku);
    if (idx >= 0) list[idx] = item;
    else list.push(item);
    this.save(list);
  },
  remove(id) {
    const list = this.all().filter((x) => x.id !== id);
    this.save(list);
  },
};

// Seed demo if empty
if (store.all().length === 0) {
  store.save([
    {
      id: crypto.randomUUID(),
      sku: "SP-001",
      name: "Điện thoại X1",
      price: 5990000,
      stock: 23,
      category: "Điện thoại",
      desc: 'Màn 6.1", pin 4200mAh',
    },
    {
      id: crypto.randomUUID(),
      sku: "SP-002",
      name: "Laptop L5",
      price: 18990000,
      stock: 7,
      category: "Laptop",
      desc: "i5, 16GB RAM, 512GB SSD",
    },
    {
      id: crypto.randomUUID(),
      sku: "SP-003",
      name: "Tai nghe TWS",
      price: 690000,
      stock: 50,
      category: "Phụ kiện",
      desc: "Chống ồn chủ động",
    },
  ]);
}

// =========================
// State + Render
// =========================
const state = {
  q: "",
  cat: "",
  get filtered() {
    let list = store.all();
    if (this.q) {
      const t = this.q.toLowerCase();
      list = list.filter((x) =>
        [x.name, x.sku, x.category].some((v) =>
          (v || "").toLowerCase().includes(t)
        )
      );
    }
    if (this.cat) list = list.filter((x) => (x.category || "") === this.cat);
    return list;
  },
};

const renderCategories = () => {
  const select = $("#categoryFilter");
  const cats = [
    ...new Set(
      store
        .all()
        .map((x) => x.category)
        .filter(Boolean)
    ),
  ].sort();
  select.innerHTML =
    '<option value="">Tất cả danh mục</option>' +
    cats.map((c) => `<option value="${c}">${c}</option>`).join("");
  if (state.cat) select.value = state.cat;
};

const renderTable = () => {
  const body = $("#tableBody");
  const list = state.filtered;
  $("#totalCount").textContent = list.length;

  body.innerHTML = list
    .map(
      (item) => `
          <tr class="hover:bg-gray-50">
            <td class="px-4 py-3 font-mono">${item.sku}</td>
            <td class="px-4 py-3">
              <div class="font-medium">${item.name}</div>
              <div class="text-xs text-gray-500 line-clamp-1">${
                item.desc || ""
              }</div>
            </td>
            <td class="px-4 py-3 text-right tabular-nums">${money(
              item.price
            )}</td>
            <td class="px-4 py-3 text-right tabular-nums">${item.stock}</td>
            <td class="px-4 py-3">${item.category || "-"}</td>
            <td class="px-4 py-3">
              <div class="flex justify-end gap-2">
                <button class="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-100" data-edit="${
                  item.id
                }">Sửa</button>
                <button class="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-100" data-del="${
                  item.id
                }">Xoá</button>
              </div>
            </td>
          </tr>
        `
    )
    .join("");

  // Bind action buttons
  body.querySelectorAll("[data-edit]").forEach((btn) => {
    btn.addEventListener("click", () =>
      openEdit(btn.getAttribute("data-edit"))
    );
  });
  body.querySelectorAll("[data-del]").forEach((btn) => {
    btn.addEventListener("click", () => doDelete(btn.getAttribute("data-del")));
  });
};

const refresh = () => {
  renderCategories();
  renderTable();
};

// =========================
// Modal + Form
// =========================
const openModal = () => $("#modal").classList.remove("hidden");
const closeModal = () => {
  $("#modal").classList.add("hidden");
  $("#productForm").reset();
  $("#formId").value = "";
};

const openCreate = () => {
  $("#modalTitle").textContent = "Thêm sản phẩm";
  openModal();
  $("#formSku").focus();
};

const openEdit = (id) => {
  const item = store.all().find((x) => x.id === id);
  if (!item) return;
  $("#modalTitle").textContent = "Sửa sản phẩm";
  $("#formId").value = item.id;
  $("#formSku").value = item.sku;
  $("#formName").value = item.name;
  $("#formPrice").value = item.price;
  $("#formStock").value = item.stock;
  $("#formCategory").value = item.category || "";
  $("#formDesc").value = item.desc || "";
  openModal();
  $("#formName").focus();
};

const doDelete = (id) => {
  const item = store.all().find((x) => x.id === id);
  if (!item) return;
  if (confirm(`Xoá sản phẩm "${item.name}"?`)) {
    store.remove(id);
    refresh();
    showToast("Đã xoá sản phẩm");
  }
};

// Validate & submit
$("#productForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const id = $("#formId").value || crypto.randomUUID();
  const payload = {
    id,
    sku: $("#formSku").value.trim(),
    name: $("#formName").value.trim(),
    price: Number($("#formPrice").value || 0),
    stock: Number($("#formStock").value || 0),
    category: $("#formCategory").value.trim(),
    desc: $("#formDesc").value.trim(),
  };

  // Ràng buộc cơ bản
  if (!payload.sku || !payload.name) {
    alert("Vui lòng nhập SKU và Tên sản phẩm");
    return;
  }
  if (payload.price < 0 || payload.stock < 0) {
    alert("Giá/Tồn kho không hợp lệ");
    return;
  }

  // Ngăn trùng SKU khác ID
  const existsSku = store
    .all()
    .some((x) => x.sku === payload.sku && x.id !== id);
  if (existsSku) {
    alert("SKU đã tồn tại");
    return;
  }

  store.upsert(payload);
  refresh();
  closeModal();
  showToast($("#formId").value ? "Đã cập nhật sản phẩm" : "Đã thêm sản phẩm");
});

// Modal close handlers
$("#modal").addEventListener("click", (e) => {
  if (e.target.dataset.close) closeModal();
});
$("#btnOpenCreate").addEventListener("click", openCreate);

// Search & filter
$("#searchInput").addEventListener("input", (e) => {
  state.q = e.target.value.trim();
  renderTable();
});
$("#categoryFilter").addEventListener("change", (e) => {
  state.cat = e.target.value;
  renderTable();
});

// Boot
refresh();
