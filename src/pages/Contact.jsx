export default function Contact() {
    return (
        
            <div style={styles.page}>
              <div style={styles.container}>
                
                {/* HEADER */}
                <header style={styles.header}>
                  <h1 style={styles.title}>Fullstack Development Solutions</h1>
                  <p style={styles.subtitle}>
                    End-to-end web, mobile & cloud solutions built with modern technologies.
                  </p>
                </header>
        
                {/* EXPERTISE SECTION */}
                <section style={styles.section}>
                  <h2 style={styles.sectionTitle}>Our Expertise</h2>
                  <ul style={styles.list}>
                    <li>Frontend Development (React, Next.js, JSX)</li>
                    <li>Backend Development (Node.js, Express, Python)</li>
                    <li>Database Architecture (MongoDB, MySQL, PostgreSQL)</li>
                    <li>REST & GraphQL API Development</li>
                    <li>DevOps & Cloud Deployment (AWS / GCP / Azure)</li>
                    <li>UI/UX Component Engineering</li>
                  </ul>
                </section>
        
                {/* WHY US? */}
                <section style={styles.section}>
                  <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
                  <p style={styles.text}>
                    We deliver scalable, secure, and optimized fullstack applications 
                    tailored for startups, enterprises, and global businesses.
                  </p>
                </section>
        
                {/* CONTACT SECTION */}
                <section style={styles.section}>
                  <h2 style={styles.sectionTitle}>Contact Us</h2>
                  <div style={styles.contactBox}>
                    <p><strong>📞 Phone:</strong> +91 8107186985</p>
                    <p><strong>📧 Email:</strong> services@fullstacksolution.net</p>
                    <p><strong>📍 Location:</strong> Jaipur, Rajasthan, India</p>
                  </div>
                </section>
        
              </div>
            </div>
          );
        }
        
        const styles = {
          page: {
            width: "100%",
            minHeight: "100vh",
            background: "#eef2f5",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "40px 20px",
          },
          container: {
            width: "100%",
            maxWidth: "900px",
            background: "#ffffff",
            padding: "40px",
            borderRadius: "16px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
          },
          header: {
            textAlign: "center",
            marginBottom: "40px",
          },
          title: {
            fontSize: "36px",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#222",
          },
          subtitle: {
            fontSize: "18px",
            color: "#666",
          },
          section: {
            marginBottom: "30px",
          },
          sectionTitle: {
            fontSize: "24px",
            marginBottom: "12px",
            fontWeight: "600",
            color: "#333",
          },
          list: {
            paddingLeft: "20px",
            lineHeight: "30px",
            fontSize: "16px",
            color: "#444",
          },
          text: {
            fontSize: "16px",
            color: "#444",
            lineHeight: "26px",
          },
          contactBox: {
            background: "#f8fafc",
            padding: "20px",
            borderRadius: "10px",
            border: "1px solid #dce3eb",
            lineHeight: "28px",
          },
        };