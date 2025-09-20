
import {Before, After} from '@wdio/cucumber-framework';

Before(async function () {
    console.log('🔧 HOOK: Setting up browser for headless mode...');
    
    try {
        // Set browser window size for headless mode
        await browser.maximizeWindow();
        console.log('✅ HOOK: Browser maximized');
        
        // Set longer timeouts for headless mode
        await browser.setTimeout({ 
            'implicit': 15000,
            'pageLoad': 30000,
            'script': 30000
        });
        console.log('✅ HOOK: Timeouts set');
        
    } catch (error) {
        console.log('❌ HOOK ERROR:', error.message);
    }
});



//ეს რაღაც უნდაო ქლაუდენ და ნახე არვიცი