/* ══════════════════════════════════════════════════
   EduChain — Shared JavaScript v2 (Sidebar Layout)
   ══════════════════════════════════════════════════ */

(function () {
  'use strict';

  var SB_KEY = 'sidebar-collapsed';

  var sidebar       = document.getElementById('sidebar');
  var mainWrapper   = document.getElementById('mainWrapper');
  var sidebarToggle = document.getElementById('sidebarToggle');
  var mobileToggle  = document.getElementById('mobileToggle');
  var overlay       = document.getElementById('sidebarOverlay');

  if (!sidebar) return;

  /* ── Restore persisted state ─────────────────── */
  function applyCollapsed(collapsed) {
    sidebar.classList.toggle('collapsed', collapsed);
    if (mainWrapper) {
      mainWrapper.style.marginLeft = collapsed
        ? 'var(--sidebar-cw)'
        : 'var(--sidebar-w)';
    }
  }
  applyCollapsed(localStorage.getItem(SB_KEY) === 'true');

  /* ── Desktop collapse toggle ──────────────────── */
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function () {
      var isCollapsed = sidebar.classList.toggle('collapsed');
      localStorage.setItem(SB_KEY, isCollapsed);
      if (mainWrapper) {
        mainWrapper.style.marginLeft = isCollapsed
          ? 'var(--sidebar-cw)'
          : 'var(--sidebar-w)';
      }
    });
  }

  /* ── Mobile overlay helpers ───────────────────── */
  function openMobile() {
    sidebar.classList.add('mobile-open');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeMobile() {
    sidebar.classList.remove('mobile-open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', function () {
      sidebar.classList.contains('mobile-open') ? closeMobile() : openMobile();
    });
  }
  if (overlay) overlay.addEventListener('click', closeMobile);

  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) closeMobile();
  });

  /* ── Active nav link ──────────────────────────── */
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && (href === path || (path === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

}());

/* ── Expandable case panel (estudantes.html) ─────── */
function toggleCase(id) {
  var panels = document.querySelectorAll('.case-panel');
  panels.forEach(function (p) {
    if (p.id === id) {
      var wasOpen = p.classList.contains('open');
      p.classList.toggle('open', !wasOpen);
      if (!wasOpen) {
        setTimeout(function () {
          p.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 50);
      }
    } else {
      p.classList.remove('open');
    }
  });
}
