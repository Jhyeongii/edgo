// src/App.jsx

import React from 'react';
import Header from './components/layout/Header';
import PDFTools from './page/PDFTools'; 
// PDFTools.jsx가 아닌 PDFTools로 Import합니다.

export default function App() {
    return (
        <div className="min-h-screen">
            <Header />
            <main className="py-6">
                <PDFTools />
            </main>
        </div>
    );
}