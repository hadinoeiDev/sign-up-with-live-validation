function testPassword(val) {
    const hasOnlyEnglishChars = /^[\x00-\x7F]*$/.test(val);
    const hasUpperCase = /[A-Z]/.test(val);
    const hasNumber = /[0-9]/.test(val);
    const isLongEnough = val.length >= 8;

    console.log('----------------------');
    console.log(`🔍 Testing password: "${val}"`);
    console.log(`✅ Only English/ASCII: ${hasOnlyEnglishChars}`);
    console.log(`🔠 Has uppercase letter: ${hasUpperCase}`);
    console.log(`🔢 Has number: ${hasNumber}`);
    console.log(`📏 Minimum 8 characters: ${isLongEnough}`);

    if (hasOnlyEnglishChars && hasUpperCase && hasNumber && isLongEnough) {
        console.log("✅ Password is valid!");
    } else {
        console.log("❌ Password is INVALID ❌");
    }
    console.log('_____   made by chat.gpt   ______');
}

