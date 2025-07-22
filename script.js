document.addEventListener('DOMContentLoaded', () => {
    // Force clear any saved location
    localStorage.removeItem('amazonDetectedLocation');
    
    // Set location to Shafter 93263
    const locationText = document.querySelector('.location-text b');
    if (locationText) {
        locationText.textContent = 'Shafter 93263';
    }
    
    // Save to localStorage for future visits
    localStorage.setItem('amazonDetectedLocation', 'Shafter 93263');
    
    // Get cart icon element
    const cartIcon = document.querySelector('.cart-icon');
    
    // Cart items functionality
    let cartItems = [];
    
    // Add click event listener to show custom cart page
    cartIcon.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Show loading spinner
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Loading your cart...</p>
        `;
        document.body.appendChild(loadingOverlay);
        
        // Wait a moment for visual feedback
        setTimeout(() => {
            // Remove loading overlay
            loadingOverlay.remove();
            
            // Display custom cart page
            showCustomCartPage();
        }, 800);
    });

    // Hide cart section on main page
    const mainPageCartSection = document.querySelector('.cart-section');
    if (mainPageCartSection) {
        mainPageCartSection.style.display = 'none';
    }
    
    // Function to show custom Amazon-style cart page
    function showCustomCartPage() {
        // Hide main content container (which includes the sidebar)
        const mainContainer = document.querySelector('.main-container');
        if (mainContainer) {
            mainContainer.style.display = 'none';
        }
        
        // Hide footer
        const footer = document.querySelector('footer');
        if (footer) {
            footer.style.display = 'none';
        }
        
        // Check if cart page already exists, if so remove it
        const existingCartPage = document.getElementById('amazon-cart-page');
        if (existingCartPage) {
            existingCartPage.remove();
        }
        
        // Create cart page container
        const cartPage = document.createElement('div');
        cartPage.id = 'amazon-cart-page';
        cartPage.className = 'amazon-cart-page';
        
        // Generate cart content based on whether cart is empty or has items
        if (cartItems.length === 0) {
            // Empty cart view
            cartPage.innerHTML = `
                <div class="cart-container">
                    <div class="cart-header">
                        <h1>Your Amazon Cart is empty</h1>
                        <p>Shop today's deals</p>
                    </div>
                    
                    <div class="empty-cart-content">
                        <img src="https://m.media-amazon.com/images/G/01/cart/empty/kettle-desaturated._CB445243794_.svg" alt="Empty cart" />
                        
                        <div class="empty-cart-actions">
                            <button class="sign-in-button">Sign in to your account</button>
                            <button class="sign-up-button">Sign up now</button>
                        </div>
                    </div>
                    
                    <div class="cart-recommendations">
                        <h2>Customers who bought items in your recent history also bought</h2>
                        <div class="recommendation-items">
                            <div class="recommendation-item">
                                <img src="https://m.media-amazon.com/images/I/41qi6w7HFRL._AC_.jpg" alt="Fire TV Stick" />
                                <div class="recommendation-details">
                                    <p class="recommendation-title">Amazon Fire TV Stick 4K streaming device</p>
                                    <div class="recommendation-rating">⭐⭐⭐⭐½ 7,796</div>
                                    <p class="recommendation-price">$29.99</p>
                                    <button class="add-to-cart-button">Add to Cart</button>
                                </div>
                            </div>
                            <div class="recommendation-item">
                                <img src
                                <div class="recommendation-details">
                                    <p class="recommendation-title">Echo Dot (5th Gen) | Smart speaker with Alexa</p>
                                    <div class="recommendation-rating">⭐⭐⭐⭐ 27,508</div>
                                    <p class="recommendation-price">$24.99</p>
                                    <button class="add-to-cart-button">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="cart-footer">
                        <p>The price and availability of items at Amazon.com are subject to change. The Cart is a temporary place to store a list of your items and reflects each item's most recent price.</p>
                        <p>Do you have a gift card or promotional code? We'll ask you to enter your claim code when it's time to pay.</p>
                    </div>
                    
                    <button class="continue-shopping-btn">Continue Shopping</button>
                </div>
            `;
        } else {
            // Cart with items
            let cartItemsHTML = '';
            let totalPrice = 0;
            let totalItems = 0;
            
            cartItems.forEach(item => {
                const itemPrice = parseFloat(item.price.replace('$', ''));
                const itemTotal = itemPrice * item.quantity;
                totalPrice += itemTotal;
                totalItems += item.quantity;
                
                cartItemsHTML += `
                    <div class="cart-item" data-id="${item.id}">
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.name}" />
                        </div>
                        <div class="cart-item-details">
                            <h2 class="cart-item-title">${item.name}</h2>
                            <p class="cart-item-price">${item.price}</p>
                            <p class="cart-item-stock">In Stock</p>
                            <p class="cart-item-shipping">Eligible for FREE Shipping</p>
                            <div class="cart-item-controls">
                                <div class="quantity-selector">
                                    <label>Qty:</label>
                                    <select class="quantity-select" data-id="${item.id}">
                                        ${generateQuantityOptions(item.quantity)}
                                    </select>
                                </div>
                                <button class="delete-button" data-id="${item.id}">Delete</button>
                                <button class="save-for-later-button">Save for later</button>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            cartPage.innerHTML = `
                <div class="cart-container">
                    <div class="cart-header">
                        <h1>Shopping Cart</h1>
                        <p class="price-heading">Price</p>
                    </div>
                    
                    <div class="cart-items-container">
                        ${cartItemsHTML}
                    </div>
                    
                    <div class="cart-subtotal">
                        <p>Subtotal (${totalItems} item${totalItems !== 1 ? 's' : ''}): <span class="subtotal-amount">$${totalPrice.toFixed(2)}</span></p>
                    </div>
                    
                    <div class="cart-checkout">
                        <div class="checkout-box">
                            <div class="subtotal-summary">
                                <p>Subtotal (${totalItems} item${totalItems !== 1 ? 's' : ''}): <span class="subtotal-amount">$${totalPrice.toFixed(2)}</span></p>
                            </div>
                            <div class="checkout-button-container">
                                <button class="proceed-to-checkout">Proceed to checkout</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="cart-recommendations">
                        <h2>Customers who bought items in your cart also bought</h2>
                        <div class="recommendation-items">
                            <div class="recommendation-item">
                                <img src="https://m.media-amazon.com/images/I/41qi6w7HFRL._AC_.jpg" alt="Fire TV Stick" />
                                <div class="recommendation-details">
                                    <p class="recommendation-title">Amazon Fire TV Stick 4K streaming device</p>
                                    <div class="recommendation-rating">⭐⭐⭐⭐½ 4,796</div>
                                    <p class="recommendation-price">$29.99</p>
                                    <button class="add-to-cart-button">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="cart-footer">
                        <p>The price and availability of items at Amazon.com are subject to change. The Cart is a temporary place to store a list of your items and reflects each item's most recent price.</p>
                        <p>Do you have a gift card or promotional code? We'll ask you to enter your claim code when it's time to pay.</p>
                    </div>
                    
                    <button class="continue-shopping-btn">Continue Shopping</button>
                </div>
            `;
        }
        
        // Add cart page to the document
        document.body.appendChild(cartPage);
        
        // Add event listeners to cart page elements
        setupCartPageEventListeners(cartPage);
    }
    
    function setupCartPageEventListeners(cartPage) {
        // Continue shopping button
        const continueShoppingBtn = cartPage.querySelector('.continue-shopping-btn');
        if (continueShoppingBtn) {
            continueShoppingBtn.addEventListener('click', () => {
                // Remove cart page
                cartPage.remove();
                
                // Show main content container and footer again
                const mainContainer = document.querySelector('.main-container');
                if (mainContainer) {
                    mainContainer.style.display = '';
                }
                
                const footer = document.querySelector('footer');
                if (footer) {
                    footer.style.display = '';
                }
            });
        }
        
        // Delete buttons
        const deleteButtons = cartPage.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const itemId = button.getAttribute('data-id');
                // Remove item from cart
                cartItems = cartItems.filter(item => item.id !== itemId);
                // Update localStorage
                localStorage.setItem('amazonCart', JSON.stringify(cartItems));
                // Update cart badge
                updateCartBadge();
                // Refresh cart page
                showCustomCartPage();
            });
        });
        
        // Quantity selectors
        const quantitySelects = cartPage.querySelectorAll('.quantity-select');
        quantitySelects.forEach(select => {
            select.addEventListener('change', () => {
                const itemId = select.getAttribute('data-id');
                const newQuantity = parseInt(select.value);
                // Update item quantity
                const item = cartItems.find(item => item.id === itemId);
                if (item) {
                    item.quantity = newQuantity;
                    // Update localStorage
                    localStorage.setItem('amazonCart', JSON.stringify(cartItems));
                    // Update cart badge
                    updateCartBadge();
                    // Refresh cart page
                    showCustomCartPage();
                }
            });
        });
        
        // Proceed to checkout button
        const checkoutButton = cartPage.querySelector('.proceed-to-checkout');
        if (checkoutButton) {
            checkoutButton.addEventListener('click', () => {
                alert('Thank you for your order! This is a demo, so no actual order has been placed.');
                // Clear cart
                cartItems = [];
                // Update localStorage
                localStorage.setItem('amazonCart', JSON.stringify(cartItems));
                // Update cart badge
                updateCartBadge();
                // Refresh cart page
                showCustomCartPage();
            });
        }
        
        // Add to cart buttons in recommendations
        const addToCartButtons = cartPage.querySelectorAll('.add-to-cart-button');
        addToCartButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const recommendationItem = button.closest('.recommendation-item');
                const productName = recommendationItem.querySelector('.recommendation-title').textContent;
                const productPrice = recommendationItem.querySelector('.recommendation-price').textContent;
                const productImage = recommendationItem.querySelector('img').src;
                const productId = `recommendation-${index}-${Date.now()}`;
                
                // Add to cart
                cartItems.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
                
                // Update localStorage
                localStorage.setItem('amazonCart', JSON.stringify(cartItems));
                
                // Update cart badge
                updateCartBadge();
                
                // Refresh cart page
                showCustomCartPage();
            });
        });
    }
    
    function generateQuantityOptions(currentQty) {
        let options = '';
        for (let i = 1; i <= 10; i++) {
            options += `<option value="${i}" ${i === currentQty ? 'selected' : ''}>${i}</option>`;
        }
        return options;
    }
    
    // Add to cart button functionality
    const addToCartButtons = document.querySelectorAll('.product-item button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productItem = button.closest('.product-item');
            const productId = productItem.id || `product-${Math.random().toString(36).substr(2, 9)}`;
            const productName = productItem.querySelector('h3').textContent;
            const productPrice = productItem.querySelector('.price').textContent;
            const productImage = productItem.querySelector('img').src;
            
            // Check if product already exists in cart
            const existingItem = cartItems.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cartItems.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
            }
            
            // Store cart items in localStorage so they persist
            localStorage.setItem('amazonCart', JSON.stringify(cartItems));
            
            // Show confirmation dialog
            showAddToCartConfirmation(productName);
            
            // Update cart count badge
            updateCartBadge();
        });
    });
    
    // Function to show confirmation when item is added to cart
    function showAddToCartConfirmation(productName) {
        // Remove existing confirmation if present
        const existingConfirmation = document.querySelector('.add-to-cart-confirmation');
        if (existingConfirmation) {
            existingConfirmation.remove();
        }
        
        // Show a proper modal dialog
        const modal = document.createElement('div');
        modal.className = 'add-to-cart-modal';
        
        modal.innerHTML = `
            <div class="add-to-cart-dialog">
                <div class="dialog-header">
                    <i class="fas fa-check-circle"></i>
                    <h3>Added to Cart</h3>
                    <button class="close-button">&times;</button>
                </div>
                <div class="dialog-content">
                    <p>"${productName.substring(0, 40)}${productName.length > 40 ? '...' : ''}" has been added to your cart.</p>
                    <div class="cart-actions">
                        <button class="continue-shopping">Continue Shopping</button>
                        <button class="view-cart">View Cart</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add CSS for the modal
        const style = document.createElement('style');
        style.textContent = `
            .add-to-cart-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            
            .add-to-cart-dialog {
                background-color: white;
                width: 400px;
                max-width: 90%;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            }
            
            .dialog-header {
                padding: 15px;
                border-bottom: 1px solid #e0e0e0;
                display: flex;
                align-items: center;
            }
            
            .dialog-header i {
                color: #5cb85c;
                font-size: 24px;
                margin-right: 10px;
            }
            
            .dialog-header h3 {
                flex-grow: 1;
                margin: 0;
                font-size: 18px;
            }
            
            .close-button {
                background: none;
                border: none;
                font-size: 22px;
                cursor: pointer;
                color: #555;
            }
            
            .dialog-content {
                padding: 15px;
            }
            
            .dialog-content p {
                margin-top: 0;
                margin-bottom: 10px;
                font-size: 14px;
                color: #333;
            }
            
            .cart-actions {
                display: flex;
                justify-content: space-between;
            }
            
            .cart-actions button {
                background-color: #f0c14b;
                color: #111;
                border: 1px solid #a88734;
                border-radius: 4px;
                padding: 10px 15px;
                cursor: pointer;
                font-size: 14px;
                transition: background-color 0.3s;
            }
            
            .cart-actions button:hover {
                background-color: #ddb347;
            }
        `;
        document.head.appendChild(style);
        
        // Close button functionality
        const closeButton = modal.querySelector('.close-button');
        closeButton.addEventListener('click', () => {
            modal.remove();
        });
        
        // Continue shopping button
        const continueShoppingButton = modal.querySelector('.continue-shopping');
        continueShoppingButton.addEventListener('click', () => {
            modal.remove();
        });
        
        // View cart button
        const viewCartButton = modal.querySelector('.view-cart');
        viewCartButton.addEventListener('click', () => {
            modal.remove();
            showCustomCartPage();
        });
        
        // Auto-remove modal after 5 seconds
        setTimeout(() => {
            modal.classList.add('fade-out');
            setTimeout(() => {
                modal.remove();
            }, 500);
        }, 5000);
    }
    
    // Function to update cart badge
    function updateCartBadge() {
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        
        // Check if badge exists, if not create it
        let cartBadge = document.querySelector('.cart-count');
        if (!cartBadge) {
            cartBadge = document.createElement('span');
            cartBadge.className = 'cart-count';
            cartIcon.appendChild(cartBadge);
            
            // Style the cart badge
            cartBadge.style.backgroundColor = '#ff9900';
            cartBadge.style.color = 'white';
            cartBadge.style.borderRadius = '50%';
            cartBadge.style.padding = '1px 6px';
            cartBadge.style.fontSize = '12px';
            cartBadge.style.fontWeight = 'bold';
            cartBadge.style.position = 'absolute';
            cartBadge.style.top = '-5px';
            cartBadge.style.right = '-5px';
        }
        
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'inline-block' : 'none';
        
        // Make sure cart icon has position relative for badge positioning
        cartIcon.style.position = 'relative';
    }
    
    // Load cart items from localStorage on page load
    const savedCart = localStorage.getItem('amazonCart');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCartBadge();
    }
    
    // Sign-in Modal Functionality
    const signInButton = document.getElementById('sign-in-button');
    const createAccountLink = document.getElementById('create-account-link');
    
    // Function to create and show modal
    function showSignInModal(isSignUp = false) {
        // Create modal overlay if it doesn't exist
        let modalOverlay = document.querySelector('.modal-overlay');
        if (!modalOverlay) {
            modalOverlay = document.createElement('div');
            modalOverlay.className = 'modal-overlay';
            document.body.appendChild(modalOverlay);
        }
        
        // Create modal content
        const title = isSignUp ? 'Create account' : 'Sign in';
        const buttonText = isSignUp ? 'Create your Amazon account' : 'Sign in';
        const switchText = isSignUp ? 'Already have an account?' : 'New to Amazon?';
        const switchAction = isSignUp ? 'Sign in' : 'Create your Amazon account';
        
        modalOverlay.innerHTML = `
            <div class="sign-in-modal">
                <button class="modal-close" title="Close">&times;</button>
                <h2>${title}</h2>
                <form class="sign-in-form">
                    ${isSignUp ? '<label for="name">Your name</label><input type="text" id="name" required>' : ''}
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                    <label for="password">Password</label>
                    <input type="password" id="password" required ${isSignUp ? 'placeholder="At least 6 characters"' : ''}>
                    ${isSignUp ? '<p style="font-size: 12px; margin-top: 5px;">Passwords must be at least 6 characters.</p>' : ''}
                    <button type="submit">${buttonText}</button>
                    <div class="form-footer">
                        <p>By continuing, you agree to Amazon's <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>.</p>
                        <p>${switchText} <a href="#" class="switch-form-link">${switchAction}</a></p>
                    </div>
                </form>
            </div>
        `;
        
        modalOverlay.style.display = 'flex';
        
        // Close button functionality
        const closeButton = modalOverlay.querySelector('.modal-close');
        closeButton.addEventListener('click', () => {
            modalOverlay.style.display = 'none';
        });
        
        // Allow clicking outside the modal to close it
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.style.display = 'none';
            }
        });
        
        // Handle ESC key to close modal
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
                modalOverlay.style.display = 'none';
            }
        });
        
        // Switch between sign-in and sign-up
        const switchLink = modalOverlay.querySelector('.switch-form-link');
        switchLink.addEventListener('click', (e) => {
            e.preventDefault();
            showSignInModal(!isSignUp);
        });
        
        // Form submission
        const form = modalOverlay.querySelector('form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            
            // Simple sign-in simulation
            if (isSignUp) {
                // Create account logic would go here
                alert(`Account created successfully for ${email}`);
            } else {
                // Sign in logic would go here
                alert(`Signed in successfully as ${email}`);
            }
            
            // Update the header to show user is signed in
            const loginSection = document.querySelector('.login-section span');
            if (loginSection) {
                loginSection.innerHTML = `Hello, ${email.split('@')[0]} <b>Account & Lists</b> <i class="fas fa-caret-down"></i>`;
            }
            
            modalOverlay.style.display = 'none';
        });
    }
    
    // Event listeners for sign-in/sign-up
    if (signInButton) {
        signInButton.addEventListener('click', () => {
            showSignInModal(false);
        });
    }
    
    if (createAccountLink) {
        createAccountLink.addEventListener('click', (e) => {
            e.preventDefault();
            showSignInModal(true);
        });
    }
    
    // Initialize cart count
    function initializeCartCount() {
        // Check for cart items in localStorage
        const savedCart = localStorage.getItem('amazonCart');
        const cartItems = savedCart ? JSON.parse(savedCart) : [];
        const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
        
        // Update cart count display
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
            
            // Make sure we update the existing updateCartBadge function to use our new cart count element
            window.updateCartBadge = function() {
                const savedCart = localStorage.getItem('amazonCart');
                const cartItems = savedCart ? JSON.parse(savedCart) : [];
                const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
                
                const cartCountElement = document.querySelector('.cart-count');
                if (cartCountElement) {
                    cartCountElement.textContent = totalItems;
                    cartCountElement.style.display = totalItems > 0 ? 'inline-block' : 'none';
                }
            };
        }
    }
    
    // Call initialization function
    initializeCartCount();
    
    // Add navigation functionality
    setupNavigation();
    
    // Set up Under Construction link
    setupUnderConstructionPage();
    
    // Add functionality for Returns & Orders
    setupReturnsAndOrders();
    
    // Add language switcher functionality
    setupLanguageSwitcher();
    
    // Set up location selector
    setupLocationSelector();
    
    // Initialize Contact Us functionality
    setupContactUs();
    
    // Make Amazon logo reset to main page
    const amazonLogo = document.querySelector('.top-logo, .amazon-logo, .header-logo'); // Multiple class options to ensure we find it
    if (amazonLogo) {
        const logoContainer = amazonLogo.closest('a') || amazonLogo;
        
        logoContainer.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create and show loading screen
            const loadingScreen = document.createElement('div');
            loadingScreen.className = 'loading-overlay';
            loadingScreen.innerHTML = `
                <div class="loading-spinner"></div>
                <p>Loading Amazon homepage...</p>
            `;
            document.body.appendChild(loadingScreen);
            
            setTimeout(() => {
                // Hide any custom pages that might be showing
                const customPages = document.querySelectorAll('#amazon-cart-page, .under-construction-page, .orders-page');
                customPages.forEach(page => {
                    if (page) page.style.display = 'none';
                });
                
                // Show main container and footer again
                const mainContainer = document.querySelector('.main-container');
                if (mainContainer) {
                    mainContainer.style.display = '';
                }
                
                const footer = document.querySelector('footer');
                if (footer) {
                    footer.style.display = '';
                }
                
                // Remove loading screen
                loadingScreen.remove();
                
                // Scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 800); // Show loading for 800ms
        });
    }
});

// Function to setup Under Construction page
function setupUnderConstructionPage() {
    // Create the under construction page
    const underConstructionPage = document.createElement('div');
    underConstructionPage.className = 'under-construction-page';
    
    // Content for the page with vertical layout and centered text
    underConstructionPage.innerHTML = `
        <div class="construction-container">
            <h1>Sorry Under Construction</h1>
            <p>This is all I know how to make as of right now :(</p>
            <div class="construction-content">
                <img src="https://media.giphy.com/media/3oKIPm3BynUpUysTHW/giphy.gif" alt="Under Construction" class="construction-image">
                <button class="back-button">Return to Homepage</button>
            </div>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(underConstructionPage);
    
    // Add the CSS for better styling
    const style = document.createElement('style');
    style.textContent = `
        .under-construction-page {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #f3f3f3;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .construction-container {
            background-color: white;
            border-radius: 8px;
            padding: 40px;
            max-width: 600px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        .under-construction-page h1 {
            color: #232f3e;
            margin-top: 0;
            font-size: 28px;
            text-align: center;
            font-weight: bold;
        }
        
        .under-construction-page p {
            color: #565959;
            font-size: 18px;
            margin-bottom: 30px;
            text-align: center;
        }
        
        .construction-content {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .construction-image {
            width: 250px;
            height: auto;
            margin-bottom: 30px;
            border-radius: 8px;
        }
        
        .back-button {
            background-color: #FFD814;
            border: 1px solid #FCD200;
            color: #0F1111;
            padding: 10px 20px;
            font-size: 16px;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .back-button:hover {
            background-color: #F7CA00;
        }
    `;
    document.head.appendChild(style);
    
    // Initially hide the page
    underConstructionPage.style.display = 'none';
    
    // Make all navigation links go to under construction page
    const navLinks = document.querySelectorAll('.bottom-nav .nav-item');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            underConstructionPage.style.display = 'flex'; // Changed to flex for better alignment
        });
    });
    
    // Add functionality to the back button with loading screen
    const backButton = underConstructionPage.querySelector('.back-button');
    backButton.addEventListener('click', function() {
        // Hide under construction page
        underConstructionPage.style.display = 'none';
        
        // Create and show loading screen
        const loadingScreen = document.createElement('div');
        loadingScreen.className = 'loading-overlay';
        loadingScreen.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Loading Amazon homepage...</p>
        `;
        document.body.appendChild(loadingScreen);
        
        // Wait a moment for the loading animation
        setTimeout(() => {
            // Remove loading screen
            loadingScreen.remove();
            
            // Show main container and footer again
            const mainContainer = document.querySelector('.main-container');
            if (mainContainer) {
                mainContainer.style.display = '';
            }
            
            const footer = document.querySelector('footer');
            if (footer) {
                footer.style.display = '';
            }
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 1000); // 1 second loading time
    });
}

// Function to handle navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Fix the bottom navigation bar (lighter shade)
    const bottomNavLinks = document.querySelectorAll('.bottom-nav .nav-item');
    bottomNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hide main container and footer
            const mainContainer = document.querySelector('.main-container');
            if (mainContainer) {
                mainContainer.style.display = 'none';
            }
            
            const footer = document.querySelector('footer');
            if (footer) {
                footer.style.display = 'none';
            }
            
            // Create or show under construction page
            let underConstructionPage = document.querySelector('.under-construction-page');
            if (!underConstructionPage) {
                underConstructionPage = document.createElement('div');
                underConstructionPage.className = 'under-construction-page';
                
                // Content for the page with vertical layout
                underConstructionPage.innerHTML = `
                    <div class="construction-container">
                        <h1>Sorry Under Construction</h1>
                        <p>This is all I know how to make as of right now :(</p>
                        <div class="construction-content">
                            <img src="https://media.giphy.com/media/3oKIPm3BynUpUysTHW/giphy.gif" alt="Under Construction" class="construction-image">
                            <button class="back-button">Return to Homepage</button>
                        </div>
                    </div>
                `;
                
                // Add to body
                document.body.appendChild(underConstructionPage);
                
                // Add click event to the back button
                const backButton = underConstructionPage.querySelector('.back-button');
                backButton.addEventListener('click', () => {
                    underConstructionPage.style.display = 'none';
                    
                    // Show main container and footer again
                    const mainContainer = document.querySelector('.main-container');
                    if (mainContainer) {
                        mainContainer.style.display = '';
                    }
                    
                    const footer = document.querySelector('footer');
                    if (footer) {
                        footer.style.display = '';
                    }
                });
            } else {
                // Show existing under construction page
                underConstructionPage.style.display = 'flex';
            }
            
            // Don't update the title based on which link was clicked - keep it consistent
            const title = underConstructionPage.querySelector('h1');
            if (title) {
                title.textContent = "Sorry Under Construction";
            }
        });
    });
}

// Function to setup Returns & Orders functionality
function setupReturnsAndOrders() {
    const returnsOrdersElement = document.querySelector('.returns-orders');
    if (returnsOrdersElement) {
        returnsOrdersElement.addEventListener('click', () => {
            // Create the under construction page if it doesn't exist
            let ordersPage = document.querySelector('.orders-page');
            if (!ordersPage) {
                ordersPage = document.createElement('div');
                ordersPage.className = 'under-construction-page orders-page';
                
                // Amazon-themed "under construction" content specifically for orders
                ordersPage.innerHTML = `
                    <h1>Your Orders</h1>
                    <p>Sorry! This is all I know how to make as of right now :(</p>
                    <div class="construction-content">
                        <img src="https://media.giphy.com/media/3o7btQ8jDTPGDpgc6I/giphy.gif" alt="Under Construction" class="construction-image">
                        <button class="back-button">Return to Homepage</button>
                    </div>
                `;
                
                document.body.appendChild(ordersPage);
                
                // Add click event to the back button
                const backButton = ordersPage.querySelector('.back-button');
                backButton.addEventListener('click', () => {
                    ordersPage.style.display = 'none';
                });
            }
            
            // Show the orders page
            ordersPage.style.display = 'flex';
        });
    }
}

// Function to setup language switcher
function setupLanguageSwitcher() {
    const languageLinks = document.querySelectorAll('.language-menu a');
    
    // Translation data
    const translations = {
        en: {
            signIn: "Sign in",
            account: "Account & Lists",
            returns: "Returns",
            orders: "& Orders",
            cart: "Cart",
            deliver: "Deliver to",
            searchPlaceholder: "Search Amazon",
            amazonHaul: "Amazon Haul",
            medicalCare: "Medical Care",
            saks: "Saks",
            bestSellers: "Best Sellers",
            amazonBasics: "Amazon Basics",
            todaysDeals: "Today's Deals",
            newReleases: "New Releases",
            registry: "Registry",
            groceries: "Groceries",
            prime: "Prime",
            giftCards: "Gift Cards",
            smartHome: "Smart Home",
            recommended: "Recommended For You",
            addToCart: "Add to Cart",
            underConstruction: "This Page is Under Construction",
            sorryMessage: "Sorry! This is all I know how to make as of right now :(",
            returnToHome: "Return to Homepage",
            yourOrders: "Your Orders",
            hello: "Hello, Sign in"
        },
        es: {
            signIn: "Iniciar sesión",
            account: "Cuenta y Listas",
            returns: "Devoluciones",
            orders: "y Pedidos",
            cart: "Carrito",
            deliver: "Entregar a",
            searchPlaceholder: "Buscar Amazon",
            amazonHaul: "Colección Amazon",
            medicalCare: "Cuidado Médico",
            saks: "Saks",
            bestSellers: "Más Vendidos",
            amazonBasics: "Amazon Básicos",
            todaysDeals: "Ofertas del Día",
            newReleases: "Novedades",
            registry: "Listas",
            groceries: "Alimentos",
            prime: "Prime",
            giftCards: "Tarjetas de Regalo",
            smartHome: "Casa Inteligente",
            recommended: "Recomendado Para Ti",
            addToCart: "Añadir al Carrito",
            underConstruction: "Esta Página está En Construcción",
            sorryMessage: "¡Lo siento! Esto es todo lo que sé hacer por ahora :(",
            returnToHome: "Volver a la Página Principal",
            yourOrders: "Tus Pedidos",
            hello: "Hola, Iniciar sesión"
        }
    };
    
    // Function to update page language without modifying the flag
    function updateLanguage(lang) {
        // Update current language text only, not the whole element
        const currentLangElement = document.querySelector('.current-language span');
        if (currentLangElement) {
            currentLangElement.textContent = lang.toUpperCase();
        }
        
        // Update flag src without replacing the element
        const currentFlag = document.querySelector('.current-language .flag-icon');
        if (currentFlag) {
            if (lang === 'es') {
                currentFlag.src = 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/1200px-Flag_of_Spain.svg.png';
                currentFlag.alt = 'Spain Flag';
            } else {
                currentFlag.src = 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png';
                currentFlag.alt = 'US Flag';
            }
        }
        
        // Update active state in menu
        languageLinks.forEach(link => {
            if (link.getAttribute('data-lang') === lang) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Update translations across the site
        const t = translations[lang];
        
        // Update header elements - only change the text content, not innerHTML
        const loginSection = document.querySelector('.login-section span');
        if (loginSection && (loginSection.textContent.includes('Sign in') || loginSection.textContent.includes('Iniciar sesión'))) {
            // Only update the text part while preserving the structure
            const boldElement = loginSection.querySelector('b');
            const iconElement = loginSection.querySelector('i');
            
            // Clear the content but keep the children
            while (loginSection.firstChild) {
                if (loginSection.firstChild === boldElement || loginSection.firstChild === iconElement) {
                    break;
                }
                loginSection.removeChild(loginSection.firstChild);
            }
            
            // Add new text node at the beginning
            loginSection.insertBefore(document.createTextNode(t.hello + ' '), loginSection.firstChild);
            
            // Update the bold text
            if (boldElement) {
                boldElement.textContent = t.account;
            }
        }
        
        // Update returns & orders - just change text content
        const returnsElement = document.querySelector('.returns-orders span');
        const ordersElement = document.querySelector('.returns-orders b');
        if (returnsElement) returnsElement.textContent = t.returns;
        if (ordersElement) ordersElement.textContent = t.orders;
        
        // Update cart text - just text content
        const cartText = document.querySelector('.cart-text');
        if (cartText) cartText.textContent = t.cart;
        
        // Update deliver to text - just text content
        const deliverText = document.querySelector('.location-text span');
        if (deliverText) deliverText.textContent = t.deliver;
        
        // Update search placeholder - attribute change
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput) searchInput.placeholder = t.searchPlaceholder;
        
        // Update navigation links - text content only
        const navItems = document.querySelectorAll('.bottom-nav .nav-item, .nav-link');
        const navTexts = [
            t.amazonHaul, t.medicalCare, t.saks, t.bestSellers, 
            t.amazonBasics, t.todaysDeals, t.newReleases, t.registry, 
            t.groceries, t.prime, t.giftCards, t.smartHome
        ];
        
        navItems.forEach((item, index) => {
            if (index < navTexts.length) {
                item.textContent = navTexts[index];
            }
        });
        
        // Update product section heading - text content
        const recommendedHeading = document.querySelector('#products h2');
        if (recommendedHeading) recommendedHeading.textContent = t.recommended;
        
        // Update Add to Cart buttons - text content
        const addToCartButtons = document.querySelectorAll('.product-item button');
        addToCartButtons.forEach(button => {
            button.textContent = t.addToCart;
        });
        
        // Update construction page if it exists - text content
        const constructionTitle = document.querySelector('.under-construction-page h1');
        const constructionMsg = document.querySelector('.under-construction-page p');
        const constructionBtn = document.querySelector('.under-construction-page .back-button');
        
        if (constructionTitle) constructionTitle.textContent = t.underConstruction;
        if (constructionMsg) constructionMsg.textContent = t.sorryMessage;
        if (constructionBtn) constructionBtn.textContent = t.returnToHome;
        
        // Update orders page if it exists - text content
        const ordersTitle = document.querySelector('.orders-page h1');
        if (ordersTitle) ordersTitle.textContent = t.yourOrders;
        
        // Store the language preference in localStorage
        localStorage.setItem('amazonLanguage', lang);
    }
    
    // Add event listeners to language links
    languageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            updateLanguage(lang);
        });
    });
    
    // Check if there's a saved language preference
    const savedLanguage = localStorage.getItem('amazonLanguage');
    if (savedLanguage) {
        updateLanguage(savedLanguage);
    }
}

// Function to setup better location detection
function setupLocationSelector() {
    // Check for saved location first
    const savedLocation = localStorage.getItem('amazonDetectedLocation');
    if (savedLocation) {
        // Use the saved location
        const locationText = document.querySelector('.location-text b');
        if (locationText) {
            locationText.textContent = savedLocation;
        }
    } else {
        // Try to get location using IP-based geolocation
        getPreciseLocation();
    }
    
    // Make the location display non-interactive
    const locationSelector = document.querySelector('.location-selector');
    if (locationSelector) {
        // Remove any click event listeners by cloning and replacing
        const newLocationSelector = locationSelector.cloneNode(true);
        locationSelector.parentNode.replaceChild(newLocationSelector, locationSelector);
    }
}

// Function to get more precise location - improved version
function getPreciseLocation() {
    const locationText = document.querySelector('.location-text b');
    if (locationText) {
        locationText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Detecting...';
    }
    
    // Check for zip code in URL (for testing Shafter 93263 and Los Angeles)
    const urlParams = new URLSearchParams(window.location.search);
    const zipParam = urlParams.get('zip');
    
    if (zipParam === '93263') {
        // Set location to Shafter 93263
        const locationText = document.querySelector('.location-text b');
        if (locationText) {
            locationText.textContent = 'Shafter 93263';
        }
        localStorage.setItem('amazonDetectedLocation', 'Shafter 93263');
        return;
    } else if (zipParam === 'la' || zipParam === 'losangeles') {
        // Set location to Los Angeles, CA
        const locationText = document.querySelector('.location-text b');
        if (locationText) {
            locationText.textContent = 'Los Angeles, CA';
        }
        localStorage.setItem('amazonDetectedLocation', 'Los Angeles, CA');
        return;
    }
    
    // Use IP-based geolocation service with a different API for redundancy
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            // Check for specific locations first
            if (data.postal === '93263') {
                const locationText = document.querySelector('.location-text b');
                if (locationText) {
                    locationText.textContent = 'Shafter 93263';
                }
                localStorage.setItem('amazonDetectedLocation', 'Shafter 93263');
                return;
            }
            
            if (data.city === 'Los Angeles' && data.region_code === 'CA') {
                const locationText = document.querySelector('.location-text b');
                if (locationText) {
                    locationText.textContent = 'Los Angeles, CA';
                }
                localStorage.setItem('amazonDetectedLocation', 'Los Angeles, CA');
                return;
            }
            
            // Format the location data for other locations
            const city = data.city || '';
            const region = data.region_code || data.region || '';
            const formattedLocation = `${city}${city && region ? ', ' : ''}${region}`;
            
            // Update the UI
            const locationText = document.querySelector('.location-text b');
            if (locationText) {
                locationText.textContent = formattedLocation || 'Your location';
            }
            
            // Store in localStorage
            localStorage.setItem('amazonDetectedLocation', formattedLocation);
        })
        .catch(error => {
            // If first API fails, try backup API
            fetch('https://ipinfo.io/json?token=6efd6bc6192994')
                .then(response => response.json())
                .then(data => {
                    // Check for Shafter 93263
                    if (data.postal === '93263') {
                        const locationText = document.querySelector('.location-text b');
                        if (locationText) {
                            locationText.textContent = 'Shafter 93263';
                        }
                        localStorage.setItem('amazonDetectedLocation', 'Shafter 93263');
                        return;
                    }
                    
                    // Check for Los Angeles
                    if (data.city === 'Los Angeles' && data.region === 'California') {
                        const locationText = document.querySelector('.location-text b');
                        if (locationText) {
                            locationText.textContent = 'Los Angeles, CA';
                        }
                        localStorage.setItem('amazonDetectedLocation', 'Los Angeles, CA');
                        return;
                    }
                    
                    // Format the location data for other locations
                    const city = data.city || '';
                    const region = data.region || '';
                    const formattedLocation = `${city}${city && region ? ', ' : ''}${region}`;
                    
                    // Update the UI
                    const locationText = document.querySelector('.location-text b');
                    if (locationText) {
                        locationText.textContent = formattedLocation || 'Your location';
                    }
                    
                    // Store in localStorage
                    localStorage.setItem('amazonDetectedLocation', formattedLocation);
                })
                .catch(error => {
                    // If all else fails, fall back to a generic location
                    const locationText = document.querySelector('.location-text b');
                    if (locationText) {
                        locationText.textContent = 'Select your address';
                    }
                });
        });
}

// Force clear the saved location and re-detect on page load
function forceLocationRefresh() {
    // Clear the saved location
    localStorage.removeItem('amazonDetectedLocation');
    
    // Get the location again
    getPreciseLocation();
}