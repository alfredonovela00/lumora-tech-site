/**
 * LUMORA TECH - LOGICA PRINCIPAL
 * 
 * Este arquivo controla toda a interatividade do site.
 * Está organizado em blocos para facilitar a manutenção.
 * 
 * 1. Loader (Tela de Carregamento)
 * 2. Navbar e Menu Mobile
 * 3. Integração com WhatsApp (Formulário)
 * 4. Modal de Portfólio (Dinâmico)
 * 5. Animações de Scroll
 * 6. Traduções (PT/EN)
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. LOADER LOGIC
    // Remove a tela de carregamento após 1.2 segundos
    // ==========================================
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
    }, 1200);

    // ==========================================
    // 2. NAVBAR SCROLL EFFECT & MOBILE MENU
    // Muda a cor da navbar ao rolar e controla o menu mobile
    // ==========================================
    const navbar = document.getElementById('navbar-main');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            // Estilo quando rola para baixo (Vidro Escuro)
            navbar.style.background = 'rgba(11, 17, 32, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        } else {
            // Estilo no topo (Mais transparente)
            navbar.style.background = 'rgba(11, 17, 32, 0.8)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'none';
        }
    });

    const navToggler = document.getElementById('navToggler');
    const navIcon = document.getElementById('navIcon');
    
    // Alternar ícone (Hamburguer <-> X)
    navToggler.addEventListener('click', function() {
        if (navIcon.classList.contains('fa-bars-staggered')) {
            navIcon.classList.remove('fa-bars-staggered');
            navIcon.classList.add('fa-xmark');
        } else {
            navIcon.classList.remove('fa-xmark');
            navIcon.classList.add('fa-bars-staggered');
        }
    });
    
    // Fechar menu automaticamente ao clicar num link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const collapse = document.getElementById('navbarNav');
            if (collapse.classList.contains('show')) {
                new bootstrap.Collapse(collapse).hide();
                navIcon.classList.remove('fa-xmark');
                navIcon.classList.add('fa-bars-staggered');
            }
        });
    });

    // ==========================================
    // 3. WHATSAPP INTEGRATION
    // Envia os dados do formulário direto para o WhatsApp da Empresa
    // ==========================================
    document.getElementById('whatsappForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Coleta os dados
        const name = document.getElementById('waName').value;
        const email = document.getElementById('waEmail').value;
        const type = document.getElementById('waType').value;
        
        // CONFIGURAÇÃO: Altere o número aqui (Formato Internacional sem +)
        const phone = "258844485042"; 
        
        // Formatação da Mensagem
        const msg = `*Novo Pedido de Orçamento* 🚀\n\n👤 *Nome:* ${name}\n📧 *Email:* ${email}\n💼 *Interesse:* ${type}\n\nGostaria de falar com um especialista sobre meu projeto.`;
        
        // Abrir WhatsApp Web/App
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
        
        // Fechar Modal
        bootstrap.Modal.getInstance(document.getElementById('contactModal')).hide();
    });

    // Variável Global de Idioma
    let currentLang = 'pt';

    // ==========================================
    // 4. PORTFOLIO MODAL LOGIC
    // Preenche o modal com as informações do card clicado
    // ==========================================
    const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
    document.querySelectorAll('.portfolio-split-card').forEach(item => {
        item.addEventListener('click', function() {
            // Pega dados do HTML (data-attributes)
            document.getElementById('modalTitle').textContent = this.dataset.title;
            document.getElementById('modalCategory').textContent = this.dataset.category;
            document.getElementById('modalBeforeImg').src = this.dataset.beforeImg;
            document.getElementById('modalAfterImg').src = this.dataset.afterImg;
            
            // Lógica de Tradução dentro do Modal
            if (currentLang === 'en') {
                document.getElementById('modalBeforeDesc').textContent = this.dataset.beforeDescEn;
                document.getElementById('modalAfterDesc').textContent = this.dataset.afterDescEn;
            } else {
                document.getElementById('modalBeforeDesc').textContent = this.dataset.beforeDesc;
                document.getElementById('modalAfterDesc').textContent = this.dataset.afterDesc;
            }
            
            const linkBtn = document.getElementById('modalLink');
            linkBtn.href = this.dataset.link || "#";
            
            projectModal.show();
        });
    });

    // ==========================================
    // 5. SCROLL ANIMATIONS
    // Faz os elementos aparecerem suavemente ao rolar
    // ==========================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card-premium, .pricing-card-neon, .portfolio-split-card, .process-step, .testimonial-card, .glass-container').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.6s ease-out";
        observer.observe(el);
    });

    // ==========================================
    // 6. TRANSLATIONS (PT/EN)
    // Dicionário de traduções
    // ==========================================
    const translations = {
        'pt': {
            // Navbar
            'nav_home': 'Início', 'nav_services': 'Soluções', 'nav_process': 'Método', 'nav_portfolio': 'Cases', 'nav_prices': 'Planos', 'nav_pay': 'Pagamentos', 'nav_faq': 'FAQ',
            
            // Hero Section
            'hero_badge': 'Qualidade Internacional',
            'hero_title_1': 'Transforme Visitantes', 'hero_title_2': 'em', 'hero_title_3': 'Clientes Globais',
            'hero_desc': 'Desenvolvimento web de alto padrão para empresas em Moçambique e no Mundo. Pagamentos flexíveis e tecnologia de ponta.',
            'btn_quote': 'Quero Vender Mais', 'btn_portfolio': 'Ver Portfólio',
            'auth_projects': 'Projetos Entregues', 'auth_rating': 'Média de Satisfação', 'auth_partner': 'Tecnologia Segura & Rápida',
            'auth_global_pay': 'Pagamentos Internacionais',

            // Serviços
            'serv_mini_title': 'Nossa Expertise',
            'serv_title_main': 'Soluções',
            'serv_title_gradient': 'Digitais',
            'serv_main_desc': 'Ferramentas de negócios que funcionam 24h por dia, em qualquer lugar do mundo.',
            'serv_1_title': 'Sites Institucionais', 'serv_1_desc': 'Sites rápidos, otimizados para o Google (SEO) e que passam credibilidade imediata para quem visita.',
            'serv_2_title': 'Landing Pages (Vendas)', 'serv_2_desc': 'Páginas de alta conversão desenhadas especificamente para campanhas de publicidade e captura de leads.',
            'serv_3_title': 'Lojas Virtuais (E-commerce)', 'serv_3_desc': 'Venda para o mundo. Integração com M-Pesa (local) e PayPal/Stripe (Internacional).',
            'serv_4_title': 'Sistemas Web / Portais', 'serv_4_desc': 'Automatize a gestão da sua escola, clínica ou empresa com sistemas personalizados e seguros.',
            
            // Processo
            'proc_mini_title': 'Passo a Passo',
            'proc_title_main': 'Método',
            'proc_title_sub': 'Remoto & Ágil',
            'proc_main_desc': 'Transparência total, esteja você em Maputo ou Lisboa.',
            'proc_1_title': 'Briefing Online', 'proc_1_desc': 'Reunião via Google Meet/Zoom.',
            'proc_2_title': 'Design & UX', 'proc_2_desc': 'Aprovação do layout antes de codar.',
            'proc_3_title': 'Dev & Testes', 'proc_3_desc': 'Programação otimizada.',
            'proc_4_title': 'Entrega Global', 'proc_4_desc': 'Treinamento e publicação.',
            
            // Portfólio
            'port_title': 'Resultados Reais', 'port_subtitle': 'Antes & Depois',
            
            // Testemunhos
            'testi_title': 'Clientes Satisfeitos',
            'testi_1': '"O M-Pesa automático no site mudou tudo. Não precisamos mais confirmar recibos manualmente no WhatsApp. Profissionalismo puro."',
            'testi_2': '"A Lumora entendeu nossa necessidade de passar confiança internacional. O site ficou rápido e responsivo."',
            'testi_2_role': 'Diretora, Global Partners MZ',
            
            // Preços
            'price_mini_title': 'Investimento',
            'price_title': 'Planos Transparentes',
            'price_sub_desc': 'Sem taxas ocultas. Preços para o mercado Local e Internacional.', 
            'price_basic': 'Essencial', 'price_pro': 'Profissional', 'price_prem': 'Sob Orçamento',
            'price_usd_1': 'ou $499 USD',
            'price_usd_2': 'ou $1,200 USD',
            'price_usd_3': 'Custom Quote',
            'price_basic_1': 'Site One-Page (Página Única)', 'price_basic_2': '100% Mobile Friendly', 'price_basic_3': 'Botão WhatsApp Flutuante', 'price_basic_4': 'Entrega em 7-10 dias',
            'price_pro_1': 'Site Completo (Até 7 páginas)', 'price_pro_2': 'SEO Otimizado (Google Maps)', 'price_pro_3': 'Painel de Gestão (WordPress)', 'price_pro_4': 'Integração Facebook/Instagram',
            'best_value': 'RECOMENDADO', 'free_hosting': 'Domínio Grátis (1º ano)', 'btn_quote_pro': 'Quero Este Plano',
            'price_prem_1': 'Produtos Ilimitados', 'price_prem_2': 'Pagamentos (M-Pesa / e-Mola)', 'price_prem_3': 'Gestão de Stocks e Clientes', 'price_prem_4': 'Treinamento da Equipe',
            'btn_quote_spec': 'Falar com Consultor',
            'pay_secure': 'Pagamento Global', 'pay_invoice': '50% Adiantamento / 50% na Entrega.',

            // Nova Seção: Fluxo Financeiro
            'pay_method_mini': 'Segurança',
            'pay_method_title': 'Fluxo Financeiro Global',
            'pay_method_desc': 'Processo simplificado e seguro para clientes Internacionais e de Moçambique.',
            'pay_step_1_title': 'Orçamento & Invoice',
            'pay_step_1_desc': 'Enviamos uma Invoice oficial com todos os detalhes do serviço.',
            'pay_step_2_title': 'Pagamento Seguro (50%)',
            'pay_step_2_desc': 'Internacional: PayPal (Proteção ao Comprador) ou SWIFT.\nLocal: M-Pesa, e-Mola ou Transferência Bancária.',
            'pay_step_3_title': 'Desenvolvimento & Entrega',
            'pay_step_3_desc': 'Iniciamos o projeto imediatamente. Os 50% finais apenas na entrega.',

            // FAQ
            'faq_mini_title': 'Dúvidas Frequentes',
            'faq_title': 'Perguntas',
            'faq_1_q': 'Quanto tempo leva para o site ficar pronto?', 'faq_1_a': 'Depende do projeto. Sites institucionais levam cerca de 7 a 10 dias. Lojas Virtuais, cerca de 20 a 30 dias. Cumprimos rigorosamente os prazos.',
            'faq_int_q': 'Moro fora de Moçambique. Como pago?', 'faq_int_a': 'Para clientes internacionais, aceitamos PayPal (mais seguro e rápido) ou Transferência Bancária Internacional (SWIFT). O processo é simples e enviamos Invoice oficial.',
            'faq_3_q': 'Tenho suporte se tiver problemas?', 'faq_3_a': 'Sim! Oferecemos 30 dias de suporte gratuito após a entrega. Também temos planos de manutenção mensal.',
            'faq_4_q': 'O processo é 100% online?', 'faq_5_a': 'Sim. Usamos WhatsApp, Zoom e Google Meet. Contratos digitais e pagamentos seguros. Atendemos clientes em Portugal, EUA e África do Sul sem sair de Maputo.',
            
            // Sobre
            'about_title': 'Criamos valor real, não apenas código.', 
            'about_desc_1': 'A Lumora Tech nasceu com uma missão: Modernizar Moçambique através da tecnologia.',
            'about_desc_2': 'Entendemos que um site é um investimento. Focamos em design que vende e tecnologia que não falha.',
            'about_foc_1': 'Foco em Retorno do Investimento (ROI)',
            'about_foc_global': 'Padrão de Qualidade Internacional',

            // Footer
            'footer_desc': 'Agência digital focada em resultados. Transformamos ideias em negócios lucrativos.',
            'serv_link_1': 'Criação de Sites', 'serv_link_2': 'Lojas Virtuais', 'serv_link_3': 'Sistemas Web',
            'news_text': 'Receba dicas de crescimento.', 'footer_copy': '© 2025 Lumora Tech. Todos os direitos reservados.',

            // Modal Static (Atualizado)
            'modal_challenge': 'O Problema', 'modal_solution': 'A Solução Lumora', 'modal_visit': 'Ver Projeto Online',
            'modal_contact_title': 'Solicitar Orçamento', 'modal_contact_desc': 'Preencha rapidamente. Vamos redirecioná-lo para nosso WhatsApp Comercial.',
            'modal_label_name': 'Seu Nome', 'modal_label_email': 'Melhor Email', 'modal_label_obj': 'O que você precisa?',
            'modal_btn_submit': 'Falar com Especialista Agora',
            
            // Placeholders e Opções do Modal
            'modal_ph_name': 'Ex: João da Silva',
            'modal_ph_email': 'Ex: joao@empresa.com',
            'opt_site': 'Quero um Site Profissional',
            'opt_store': 'Quero Vender Online (E-commerce)',
            'opt_system': 'Preciso de um Sistema/App',
            'opt_other': 'Outro assunto'
        },
        'en': {
            // Nav
            'nav_home': 'Home', 'nav_services': 'Solutions', 'nav_process': 'Method', 'nav_portfolio': 'Cases', 'nav_prices': 'Plans', 'nav_pay': 'Payments', 'nav_faq': 'FAQ',
            
            // Hero
            'hero_badge': 'International Quality',
            'hero_title_1': 'Turn Visitors', 'hero_title_2': 'into', 'hero_title_3': 'Global Customers',
            'hero_desc': 'High-standard web development for companies in Mozambique and Worldwide. Flexible payments and cutting-edge technology.',
            'btn_quote': 'I Want More Sales', 'btn_portfolio': 'View Portfolio',
            'auth_projects': 'Projects Delivered', 'auth_rating': 'Satisfaction Rate', 'auth_partner': 'Secure & Fast Tech',
            'auth_global_pay': 'International Payments',
            
            // Services
            'serv_mini_title': 'Our Expertise',
            'serv_title_main': 'Digital',
            'serv_title_gradient': 'Solutions',
            'serv_main_desc': 'Business tools that work 24/7, anywhere in the world.',
            'serv_1_title': 'Corporate Websites', 'serv_1_desc': 'Fast websites, optimized for Google (SEO), providing immediate credibility to visitors.',
            'serv_2_title': 'Landing Pages (Sales)', 'serv_2_desc': 'High-conversion pages designed specifically for ad campaigns and lead capture.',
            'serv_3_title': 'Online Stores (E-commerce)', 'serv_3_desc': 'Sell globally. Integration with M-Pesa (Local) and PayPal/Stripe (International).',
            'serv_4_title': 'Web Systems / Portals', 'serv_4_desc': 'Automate your school, clinic, or business management with custom, secure systems.',
            
            // Process
            'proc_mini_title': 'Step by Step',
            'proc_title_main': 'Agile & Remote',
            'proc_title_sub': 'Method',
            'proc_main_desc': 'Total transparency, whether you are in Maputo or Lisbon.',
            'proc_1_title': 'Online Briefing', 'proc_1_desc': 'Meeting via Google Meet/Zoom.',
            'proc_2_title': 'Design & UX', 'proc_2_desc': 'Layout approval before coding.',
            'proc_3_title': 'Dev & Testing', 'proc_3_desc': 'Optimized coding.',
            'proc_4_title': 'Global Delivery', 'proc_4_desc': 'Training and publishing.',
            
            // Portfolio
            'port_title': 'Real Results', 'port_subtitle': 'Before & After',
            
            // Testimonials
            'testi_title': 'Satisfied Clients',
            'testi_1': '"The automatic M-Pesa on the site changed everything. We no longer need to manually verify receipts on WhatsApp. Pure professionalism."',
            'testi_2': '"Lumora understood our need to convey international trust. The site is fast and responsive."',
            'testi_2_role': 'Director, Global Partners MZ',

            // Prices
            'price_mini_title': 'Investment',
            'price_title': 'Transparent Plans',
            'price_sub_desc': 'No hidden fees. Pricing for Local and International markets.',
            'price_basic': 'Essential', 'price_pro': 'Professional', 'price_prem': 'Custom Quote',
            'price_usd_1': 'or $499 USD',
            'price_usd_2': 'or $1,200 USD',
            'price_usd_3': 'Custom Quote',
            'price_basic_1': 'One-Page Site', 'price_basic_2': '100% Mobile Friendly', 'price_basic_3': 'Floating WhatsApp Button', 'price_basic_4': 'Delivery in 7-10 days',
            'price_pro_1': 'Full Site (Up to 7 pages)', 'price_pro_2': 'SEO Optimized (Google Maps)', 'price_pro_3': 'Management Panel (WordPress)', 'price_pro_4': 'Facebook/Instagram Integration',
            'best_value': 'RECOMMENDED', 'free_hosting': 'Free Domain & Hosting (1 Year)', 'btn_quote_pro': 'I Want This Plan',
            'price_prem_1': 'Unlimited Products', 'price_prem_2': 'Payments (M-Pesa / e-Mola)', 'price_prem_3': 'Stock & Client Management', 'price_prem_4': 'Team Training',
            'btn_quote_spec': 'Talk to Consultant',
            'pay_secure': 'Global Payments', 'pay_invoice': '50% Upfront / 50% on Delivery.',

            // Nova Seção: Fluxo Financeiro
            'pay_method_mini': 'Security',
            'pay_method_title': 'Global Financial Flow',
            'pay_method_desc': 'Simplified and secure process for International and Mozambique clients.',
            'pay_step_1_title': 'Quote & Invoice',
            'pay_step_1_desc': 'We send an official Invoice with all service details.',
            'pay_step_2_title': 'Secure Payment (50%)',
            'pay_step_2_desc': 'International: PayPal (Buyer Protection) or SWIFT.\nLocal: M-Pesa, e-Mola or Bank Transfer.',
            'pay_step_3_title': 'Development & Delivery',
            'pay_step_3_desc': 'We start immediately. Final 50% only upon delivery.',

            // FAQ
            'faq_mini_title': 'FAQ',
            'faq_title': 'Common Questions',
            'faq_1_q': 'How long does it take?', 'faq_1_a': 'It depends on the project. Corporate sites take about 7 to 10 days. Online Stores take 20 to 30 days. We strictly meet deadlines.',
            'faq_int_q': 'I live outside Mozambique. How do I pay?', 'faq_int_a': 'For international clients, we accept PayPal (safer and faster) or International Bank Transfer (SWIFT). The process is simple, and we send an official invoice.',
            'faq_3_q': 'Is there support if I have problems?', 'faq_3_a': 'Yes! We offer 30 days of free support after delivery. We also have monthly maintenance plans.',
            'faq_4_q': 'Is the process 100% online?', 'faq_5_a': 'Yes. We use WhatsApp, Zoom, and Google Meet. Digital contracts and secure payments. We serve clients in Portugal, USA, and South Africa without leaving Maputo.',
            
            // About
            'about_title': 'We create real value, not just code.', 
            'about_desc_1': 'Lumora Tech was born with a mission: Modernize Mozambique through technology.',
            'about_desc_2': 'We understand that a website is an investment. We focus on design that sells and technology that doesn\'t fail.',
            'about_foc_1': 'Focus on Return on Investment (ROI)',
            'about_foc_global': 'International Quality Standard',

            // Footer
            'footer_desc': 'Digital agency focused on results. We turn ideas into profitable businesses.',
            'serv_link_1': 'Websites', 'serv_link_2': 'Online Stores', 'serv_link_3': 'Web Systems',
            'news_text': 'Get growth tips.', 'footer_copy': '© 2025 Lumora Tech. All rights reserved.',

            // Modal Static (Atualizado)
            'modal_challenge': 'The Problem', 'modal_solution': 'The Lumora Solution', 'modal_visit': 'View Project Online',
            'modal_contact_title': 'Request Quote', 'modal_contact_desc': 'Fill in quickly. We will redirect you to our Business WhatsApp.',
            'modal_label_name': 'Your Name', 'modal_label_email': 'Best Email', 'modal_label_obj': 'What do you need?',
            'modal_btn_submit': 'Chat with Expert Now',

            // Placeholders e Opções do Modal
            'modal_ph_name': 'Ex: John Doe',
            'modal_ph_email': 'Ex: john@company.com',
            'opt_site': 'I want a Professional Website',
            'opt_store': 'I want to Sell Online (E-commerce)',
            'opt_system': 'I need a System/App',
            'opt_other': 'Other subject'
        }
    };

    // Event Listener para troca de idioma
    document.getElementById('langSwitch').addEventListener('click', function() {
        currentLang = currentLang === 'pt' ? 'en' : 'pt';
        
        // Atualiza visual do botão
        const spans = this.querySelectorAll('span');
        spans[0].className = currentLang === 'pt' ? 'active-lang' : 'inactive-lang';
        spans[1].className = currentLang === 'en' ? 'active-lang' : 'inactive-lang';

        // Atualiza textos normais
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (translations[currentLang][key]) {
                el.innerText = translations[currentLang][key]; 
            }
        });

        // Atualiza Placeholders (Inputs)
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            if (translations[currentLang][key]) {
                el.placeholder = translations[currentLang][key]; 
            }
        });
    });
});