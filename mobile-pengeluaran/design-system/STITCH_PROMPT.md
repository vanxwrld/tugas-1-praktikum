# Prompt UI/UX untuk Google Stitch (Prototyping)

Tempel prompt di bawah ke Google Stitch untuk generate prototipe aplikasi
"PengeluaranKu" sesuai design system yang dipakai di kode. Hasilnya bisa
dicek dosen sebagai bahan prototyping.

Catatan teknis untuk Stitch:
- Prompt ditulis bahasa Inggris (Stitch paling akurat dengan English).
- Versi Indonesia ada di bagian paling bawah, untuk penjelasan di laporan.

---

## 1. Prompt utama (app-wide)

```
Design a mobile expense tracker app called "PengeluaranKu" for Android and iOS,
375px-wide mobile screens. Theme: dark, professional fintech look.

Design tokens (use exactly):
- Background #0F172A, surface/card #192134, muted surface #101A34
- Primary/brand (trust blue) #3B82F6, secondary #6366F1
- Accent/CTA and profit green #059669
- Text on dark #FFFFFF, secondary text #94A3B8
- Border rgba(255,255,255,0.08), destructive/error #DC2626
- Font: Plus Jakarta Sans (headings 700/800, body 400/600)
- Radius: cards 12px, inputs/buttons 8px, chips 9999px
- Spacing base 8px; card padding 16px; section gap 24px
- Effects: subtle backdrop blur 10-20px, 1px subtle borders, soft Z-depth shadows

UX rules: no emoji as icons (use SVG icons like Heroicons/Lucide), min 44px
touch targets, visible focus/hover states with 150-300ms transitions,
4.5:1 text contrast, inline error messages under inputs, loading skeletons,
empty states with clear call-to-action, safe-area padding for notched devices.

CRITICAL: Do NOT use pure white page backgrounds. Do NOT use emoji icons.
```

## 2. Prompt per layar (tempel terpisah untuk tiap screen)

### Home / Daftar Pengeluaran
```
Mobile screen: expense list home for PengeluaranKu, dark theme #0F172A.
Top app bar titled "Pengeluaran" on surface #192134.
Primary button full-width "Tambah pengeluaran" (green #059669),
secondary outline button "Muat ulang".
List of expense cards: each card surface #192134, radius 12px, border
rgba(255,255,255,0.08), contains: expense title (white, 16px semibold),
amount in red #DC2626 right-aligned (e.g. "Rp 20.000"), category chip
(outlined pill, small), date in muted #94A3B8.
States to show: loaded list (4 items), pull-to-refresh spinner,
empty state (icon + "Belum ada pengeluaran" + hint text),
loading skeleton cards, and an inline error banner (#DC2626 tinted).
```

### Tambah (Add) Pengeluaran
```
Mobile screen: add expense form, dark theme #0F172A, title "Tambah pengeluaran".
Fields: "Judul" text input (placeholder "Contoh: Makan siang", max 100 chars),
"Nominal rupiah" numeric input (placeholder "Contoh: 20000"),
category picker as a 2-column chip grid: Tanpa kategori, Pendidikan,
Makanan, Transport, Hiburan — selected chip has green border #059669
and a check icon.
Inputs: background #101A34, 1px border rgba(255,255,255,0.08),
focus border/ring green #059669, label above in #94A3B8 14px.
Error state: red text under field "Judul wajib diisi", field border #DC2626.
Helper text: "Tanggal diisi otomatis oleh server."
Bottom primary button "Simpan" (green, full width, disabled state grayed).
Also show a variant of this screen with an inline error banner at top.
```

### Ubah (Edit) Pengeluaran
```
Mobile screen: edit expense form, dark theme, title "Ubah pengeluaran".
Same fields as add screen, pre-filled (e.g. title "Makan siang",
nominal "20000"), category NOT editable shown as read-only note:
"Kategori, tanggal, dan catatan tidak dapat diedit."
Primary button "Simpan" full width. Include a saving state:
button shows spinner + "Menyimpan...".
```

### Detail Pengeluaran
```
Mobile screen: expense detail, dark theme, title "Detail pengeluaran".
Big card surface #192134 radius 12px: row 1 = title left (white 20px bold)
and amount right in red #DC2626 (e.g. "Rp 20.000");
then label/value rows: Tanggal, Kategori, Catatan (label #94A3B8,
value white right-aligned, divider rgba(255,255,255,0.08) between rows).
Three stacked full-width buttons:
"Kembali" (outline), "Ubah" (indigo secondary #6366F1),
"Hapus" (destructive red #DC2626).
Also show delete confirmation dialog: title "Hapus pengeluaran",
message "Hapus Makan siang?", actions "Batal" and destructive "Hapus".
```

## 3. Prompt variasi (opsional, kalau dosen minta alternatif)

```
Generate a LIGHT MODE variant of PengeluaranKu: background #F8FAFC,
surface #FFFFFF, text #0F172A, secondary text #64748B, borders #E2E8F0,
keep primary green #059669 and error #DC2626. Same layout, same typography,
4.5:1 contrast on all text.
```

---

## Penjelasan singkat (Bahasa Indonesia, untuk laporan)

Aplikasi "PengeluaranKu" memakai design system hasil skill ui-ux-pro-max:
tema gelap profesional ala aplikasi finansial, latar #0F172A, aksen hijau
profit #059669 untuk tombol utama, biru trust #3B82F6 sebagai brand, teks
putih dengan abu-abu sekunder #94A3B8, font Plus Jakarta Sans, radius 12px
untuk kartu, jarak dasar 8px, dan efek shadow halus. Aturan UX yang
diterapkan: target sentuh minimal 44px, pesan error inline di bawah input,
status loading/empty/error tersedia di tiap layar, ikon memakai SVG (bukan
emoji), dan kontras teks minimal 4.5:1. Prompt di atas dipakai untuk
membuat prototipe di Google Stitch agar desain dapat diverifikasi sebelum
implementasi.
