export const ProjectsDone = () => {
  const projects = [
    {
      title: "E-commerce AI Assistant",
      category: "AI Agent",
      description: "Intelligent chatbot that increased customer engagement by 300% for a major retailer",
      image: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHxBSSUyMHRlY2hub2xvZ3l8ZW58MHx8fGJsdWV8MTc1MjYzNDc2NXww&ixlib=rb-4.1.0&q=85",
      technologies: ["Natural Language Processing", "Machine Learning", "API Integration"]
    },
    {
      title: "Healthcare Management Platform",
      category: "AI Website",
      description: "Comprehensive healthcare platform with AI-powered patient management and analytics",
      image: "https://images.pexels.com/photos/16053029/pexels-photo-16053029.jpeg",
      technologies: ["React", "AI Analytics", "Data Visualization", "Cloud Computing"]
    },
    {
      title: "Financial Services SEO Campaign",
      category: "SEO Optimization",
      description: "Achieved 400% increase in organic traffic for a fintech startup through AI-driven SEO",
      image: "https://images.unsplash.com/photo-1601132359864-c974e79890ac?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHxBSSUyMHRlY2hub2xvZ3l8ZW58MHx8fGJsdWV8MTc1MjYzNDc2NXww&ixlib=rb-4.1.0&q=85",
      technologies: ["AI Content Generation", "Technical SEO", "Analytics", "Performance Optimization"]
    },
    {
      title: "Manufacturing Automation System",
      category: "Automation",
      description: "Automated production line monitoring system that reduced downtime by 60%",
      image: "https://images.unsplash.com/photo-1700498466261-824cbd01974e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwyfHxkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwwfHx8Ymx1ZXwxNzUyNzQwNjYyfDA&ixlib=rb-4.1.0&q=85",
      technologies: ["IoT Integration", "Real-time Monitoring", "Predictive Analytics", "Workflow Automation"]
    }
  ];

  return (
    <section id="projects" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-gray-100 text-black">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-accent text-gray-600 mb-4">OUR WORK</p>
          <h2 className="section-title mb-6">
            Recent <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle text-gray-700 max-w-2xl mx-auto">
            Explore our successful implementations and see how we've helped businesses transform with AI
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-accent font-semibold">
                  {project.category}
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 font-display">{project.title}</h3>
                <p className="text-gray-600 mb-6 font-body">{project.description}</p>
                
                <div className="mb-6">
                  <h4 className="text-small font-semibold text-gray-800 mb-2 font-mono">TECHNOLOGIES USED:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-small">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="text-purple-600 font-semibold hover:text-purple-800 transition-colors duration-200 font-display">
                  View Details →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};