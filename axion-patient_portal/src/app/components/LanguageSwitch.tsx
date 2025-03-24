"use client";

import React from 'react'
import { useLanguage } from '@/app/components/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function LanguageSwitch() {
    const { changeLanguage, language } = useLanguage();

    return (
        <Select value={language} onValueChange={changeLanguage}>
            <SelectTrigger>
                <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="si">සිංහල</SelectItem>
                <SelectItem value="ta">தமிழ்</SelectItem>
            </SelectContent>
        </Select>
    );
}
