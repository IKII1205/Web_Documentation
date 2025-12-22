/**
 * Resizable Sidebar Module
 * Allows users to drag the sidebar edge to resize it left/right
 * Persists sidebar width to localStorage
 */

(function() {
  'use strict';

  const SIDEBAR_WIDTH_KEY = 'justTheDocs_sidebarWidth';
  const MIN_WIDTH = 240; // Minimum sidebar width in pixels
  const MAX_WIDTH = 500; // Maximum sidebar width in pixels
  const DEFAULT_WIDTH = 256; // Default width (matches $nav-width-md)

  /**
   * Initialize resizable sidebar
   */
  function initResizableSidebar() {
    const sidebar = document.getElementById('sidebar');
    const handle = document.getElementById('sidebar-resize-handle');

    if (!sidebar || !handle) {
      console.warn('Sidebar or resize handle not found');
      return;
    }

    // Restore saved width or use default
    const savedWidth = localStorage.getItem(SIDEBAR_WIDTH_KEY);
    if (savedWidth) {
      setSidebarWidth(parseFloat(savedWidth));
    }

    // Mouse events for drag
    handle.addEventListener('mousedown', startResize);
    document.addEventListener('mousemove', onResize);
    document.addEventListener('mouseup', stopResize);

    // Touch events for mobile (if needed)
    handle.addEventListener('touchstart', startResize);
    document.addEventListener('touchmove', onResize);
    document.addEventListener('touchend', stopResize);

    // Listen for window resize to update body padding
    window.addEventListener('resize', updateBodyPadding);
  }

  let isResizing = false;
  let startX = 0;
  let startWidth = 0;

  /**
   * Start resizing
   */
  function startResize(e) {
    if (e.type.includes('touch')) {
      startX = e.touches[0].clientX;
    } else {
      startX = e.clientX;
    }

    const sidebar = document.getElementById('sidebar');
    startWidth = sidebar.offsetWidth;
    isResizing = true;

    // Add active state
    const handle = document.getElementById('sidebar-resize-handle');
    handle.classList.add('active');
    sidebar.classList.add('resizing');

    // Prevent text selection during drag
    e.preventDefault();
  }

  /**
   * Handle resize movement
   */
  function onResize(e) {
    if (!isResizing) return;

    let currentX;
    if (e.type.includes('touch')) {
      currentX = e.touches[0].clientX;
    } else {
      currentX = e.clientX;
    }

    const diff = currentX - startX;
    let newWidth = startWidth + diff;

    // Constrain width to min/max
    newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, newWidth));

    setSidebarWidth(newWidth);
  }

  /**
   * Stop resizing
   */
  function stopResize() {
    if (!isResizing) return;

    isResizing = false;

    const sidebar = document.getElementById('sidebar');
    const handle = document.getElementById('sidebar-resize-handle');

    handle.classList.remove('active');
    sidebar.classList.remove('resizing');

    // Save width to localStorage
    const width = sidebar.offsetWidth;
    localStorage.setItem(SIDEBAR_WIDTH_KEY, width.toString());
  }

  /**
   * Set sidebar width
   */
  function setSidebarWidth(width) {
    const sidebar = document.getElementById('sidebar');

    if (!sidebar) return;

    // Set CSS variable for width
    document.documentElement.style.setProperty('--sidebar-width', width + 'px');

    // Update sidebar width
    sidebar.style.width = width + 'px';

    // Update body padding
    updateBodyPadding();
  }

  /**
   * Update body padding to match sidebar width
   */
  function updateBodyPadding() {
    const sidebar = document.getElementById('sidebar');
    const main = document.querySelector('.main');

    if (!sidebar || !main) return;

    // Get current sidebar width
    const sidebarWidth = sidebar.offsetWidth;
    
    // Check if we're at md breakpoint or larger
    if (window.matchMedia('(min-width: 768px)').matches) {
      // Update main margin and width instead of body padding
      main.style.marginLeft = sidebarWidth + 'px';
      main.style.width = 'calc(100% - ' + sidebarWidth + 'px)';
    } else {
      main.style.marginLeft = '0';
      main.style.width = '100%';
    }
  }

  /**
   * Reset sidebar to default width
   */
  function resetSidebarWidth() {
    localStorage.removeItem(SIDEBAR_WIDTH_KEY);
    setSidebarWidth(DEFAULT_WIDTH);
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initResizableSidebar);
  } else {
    initResizableSidebar();
  }

  // Expose reset function to window
  window.resetSidebarWidth = resetSidebarWidth;
})();
