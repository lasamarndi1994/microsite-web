import { defineRule, configure } from 'vee-validate';
import { required, email, min, numeric, url } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import en from '@vee-validate/i18n/dist/locale/en.json';

// Define rules
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('numeric', numeric);
defineRule('url', url);

// Configure localization
configure({
    generateMessage: localize({
        en,
    }),
});
