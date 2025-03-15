"use client";

import { FaPlus, FaTrash, FaEdit, FaLaptopCode, FaChalkboardTeacher, FaEnvelope } from "react-icons/fa";
import { useState, useEffect, Suspense } from "react";
import { useContent, VolunteerExperience, ExtracurricularActivity, Service } from "@/contexts/ContentContext";
import EditableContent from "@/components/EditableContent";
import EditableList from "@/components/EditableList";
import Link from "next/link";

function ActivitiesPageLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-12"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
          <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
        </div>
      </div>
    </div>
  );
}

function ActivitiesClient() {
  const { content, isLoading, error, updateContent, isEditMode } = useContent();
  
  // Local states for editing
  const [localVolunteering, setLocalVolunteering] = useState<VolunteerExperience[]>([]);
  const [localActivities, setLocalActivities] = useState<ExtracurricularActivity[]>([]);
  const [localServices, setLocalServices] = useState<Service[]>([]);
  const [prevEditMode, setPrevEditMode] = useState(false);

  // Initialize local states from content
  useEffect(() => {
    if (content) {
      console.log('Initializing Activities page from content');
      setLocalVolunteering(content.volunteering || []);
      setLocalActivities(content.extracurricularActivities || []);
      setLocalServices(content.services || [
        {
          title: "Custom Website Development",
          description: "I create modern, responsive websites for individuals and businesses that are fast, secure, and easy to maintain.",
          icon: "website",
          features: [
            "Mobile-responsive design",
            "SEO optimization",
            "Content management systems",
            "E-commerce integration",
            "Performance optimization"
          ]
        },
        {
          title: "STEM, Coding & Chess Tutoring",
          description: "Personalized tutoring sessions for students of all ages in STEM subjects, programming, and chess strategy.",
          icon: "tutoring",
          features: [
            "Customized learning plans",
            "Hands-on projects",
            "Beginner to advanced levels",
            "One-on-one or small group sessions",
            "Regular progress assessments"
          ]
        }
      ]);
    }
  }, [content]);
  
  // Track edit mode changes
  useEffect(() => {
    if (!content) return;
    setPrevEditMode(isEditMode);
  }, [isEditMode, content]);
  
  // Save changes when exiting edit mode
  useEffect(() => {
    if (!content) return;
    
    if (prevEditMode && !isEditMode) {
      console.log('Saving Activities page changes...');
      
      // Create updated content object
      const updatedContent = {
        ...content,
        volunteering: localVolunteering,
        extracurricularActivities: localActivities,
        services: localServices
      };
      
      updateContent(updatedContent)
        .then(success => {
          if (success) {
            console.log('Activities page changes saved successfully');
          } else {
            console.error('Failed to save Activities page changes');
          }
        })
        .catch(err => {
          console.error('Error saving Activities page changes:', err);
        });
    }
  }, [isEditMode, prevEditMode, content, localVolunteering, localActivities, localServices, updateContent]);

  // Helper to update a volunteer experience
  const updateVolunteering = (index: number, field: keyof VolunteerExperience, value: any) => {
    const updatedVolunteering = [...localVolunteering];
    updatedVolunteering[index] = { ...updatedVolunteering[index], [field]: value };
    setLocalVolunteering(updatedVolunteering);
  };

  // Helper to add a new volunteer experience
  const addVolunteering = () => {
    const newVolunteering: VolunteerExperience = {
      title: "New Volunteer Experience",
      period: "Current",
      description: ["Add description"]
    };
    setLocalVolunteering([...localVolunteering, newVolunteering]);
  };

  // Helper to remove a volunteer experience
  const removeVolunteering = (index: number) => {
    const updatedVolunteering = [...localVolunteering];
    updatedVolunteering.splice(index, 1);
    setLocalVolunteering(updatedVolunteering);
  };

  // Helper to update an activity
  const updateActivity = (index: number, field: keyof ExtracurricularActivity, value: string) => {
    const updatedActivities = [...localActivities];
    updatedActivities[index] = { ...updatedActivities[index], [field]: value };
    setLocalActivities(updatedActivities);
  };

  // Helper to add a new activity
  const addActivity = () => {
    const newActivity: ExtracurricularActivity = {
      title: "New Activity",
      description: "Description of the activity",
      period: "Current"
    };
    setLocalActivities([...localActivities, newActivity]);
  };

  // Helper to remove an activity
  const removeActivity = (index: number) => {
    const updatedActivities = [...localActivities];
    updatedActivities.splice(index, 1);
    setLocalActivities(updatedActivities);
  };

  // Helper functions for services
  const updateService = (index: number, field: keyof Service, value: any) => {
    const updatedServices = [...localServices];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    setLocalServices(updatedServices);
  };

  const updateServiceFeature = (serviceIndex: number, featureIndex: number, value: string) => {
    const updatedServices = [...localServices];
    const service = updatedServices[serviceIndex];
    
    if (service.features) {
      const updatedFeatures = [...service.features];
      updatedFeatures[featureIndex] = value;
      updatedServices[serviceIndex] = { ...service, features: updatedFeatures };
      setLocalServices(updatedServices);
    }
  };

  const addServiceFeature = (serviceIndex: number) => {
    const updatedServices = [...localServices];
    const service = updatedServices[serviceIndex];
    
    const updatedFeatures = service.features ? [...service.features, "New feature"] : ["New feature"];
    updatedServices[serviceIndex] = { ...service, features: updatedFeatures };
    setLocalServices(updatedServices);
  };

  const removeServiceFeature = (serviceIndex: number, featureIndex: number) => {
    const updatedServices = [...localServices];
    const service = updatedServices[serviceIndex];
    
    if (service.features) {
      const updatedFeatures = [...service.features];
      updatedFeatures.splice(featureIndex, 1);
      updatedServices[serviceIndex] = { ...service, features: updatedFeatures };
      setLocalServices(updatedServices);
    }
  };

  const addService = () => {
    const newService: Service = {
      title: "New Service",
      description: "Description of the service...",
      icon: "default",
      features: ["Feature 1", "Feature 2", "Feature 3"]
    };
    setLocalServices([...localServices, newService]);
  };

  const removeService = (index: number) => {
    const updatedServices = [...localServices];
    updatedServices.splice(index, 1);
    setLocalServices(updatedServices);
  };

  if (isLoading) return <ActivitiesPageLoading />;
  if (error) return <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 text-red-500">Error loading content: {error}</div>;
  if (!content) return <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">Loading content...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-12">Activities & Services</h1>

      {/* Extracurricular Activities Section */}
      <section id="activities" className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Extracurricular Activities</h2>
        
        {isEditMode && (
          <button
            onClick={addActivity}
            className="mb-6 flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            <FaPlus className="mr-2" /> Add Activity
          </button>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {localActivities.map((activity, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg relative"
            >
              {isEditMode && (
                <button
                  onClick={() => removeActivity(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                  aria-label="Delete Activity"
                >
                  <FaTrash size={12} />
                </button>
              )}
              
              <EditableContent
                value={activity.title}
                onChange={(value) => updateActivity(index, 'title', value)}
                as="h3"
                className="text-xl font-bold mb-2"
              />
              
              <EditableContent
                value={activity.description}
                onChange={(value) => updateActivity(index, 'description', value)}
                as="p"
                className="text-gray-600 dark:text-gray-400 mb-2"
                isTextArea
              />
              
              <EditableContent
                value={activity.period}
                onChange={(value) => updateActivity(index, 'period', value)}
                as="span"
                className="text-blue-600 dark:text-blue-400"
                isPlainValue
              />
            </div>
          ))}
        </div>
      </section>

      {/* Volunteering Section */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Volunteering</h2>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        {isEditMode && (
          <button
            onClick={addVolunteering}
            className="mb-6 flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            <FaPlus className="mr-2" /> Add Volunteer Experience
          </button>
        )}
        
        <div className="space-y-8">
          {localVolunteering.map((volunteer, index) => (
            <div key={index} className="border-l-4 border-blue-600 pl-6 py-2 relative">
              {isEditMode && (
                <button
                  onClick={() => removeVolunteering(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                  aria-label="Delete Volunteer Experience"
                >
                  <FaTrash size={12} />
                </button>
              )}
              
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                {isEditMode ? (
                  <EditableContent
                    value={volunteer.title}
                    onChange={(value) => updateVolunteering(index, 'title', value)}
                    as="h3"
                    className="text-xl font-bold"
                  />
                ) : (
                  <h3 className="text-xl font-bold">{volunteer.title}</h3>
                )}
                
                {isEditMode ? (
                  <EditableContent
                    value={volunteer.period}
                    onChange={(value) => updateVolunteering(index, 'period', value)}
                    as="span"
                    className="text-gray-600 dark:text-gray-400"
                  />
                ) : (
                  <span className="text-gray-600 dark:text-gray-400">{volunteer.period}</span>
                )}
              </div>
              
              <EditableList
                items={volunteer.description}
                onChange={(newItems) => updateVolunteering(index, 'description', newItems)}
                itemClassName="text-gray-700 dark:text-gray-300"
              />
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Services</h2>
        
        {isEditMode && (
          <button
            onClick={addService}
            className="mb-6 flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            <FaPlus className="mr-2" /> Add Service
          </button>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {localServices.map((service, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden relative">
              {isEditMode && (
                <button
                  onClick={() => removeService(index)}
                  className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 z-10"
                  aria-label="Delete Service"
                >
                  <FaTrash size={12} />
                </button>
              )}
              
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
                    {service.icon === 'website' ? (
                      <FaLaptopCode className="text-2xl text-blue-600 dark:text-blue-400" />
                    ) : service.icon === 'tutoring' ? (
                      <FaChalkboardTeacher className="text-2xl text-blue-600 dark:text-blue-400" />
                    ) : (
                      <FaEdit className="text-2xl text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <div>
                    {isEditMode ? (
                      <EditableContent
                        value={service.title}
                        onChange={(value) => updateService(index, 'title', value)}
                        as="h3"
                        className="text-xl font-bold"
                      />
                    ) : (
                      <h3 className="text-xl font-bold">{service.title}</h3>
                    )}
                  </div>
                </div>
                
                {isEditMode ? (
                  <EditableContent
                    value={service.description}
                    onChange={(value) => updateService(index, 'description', value)}
                    as="p"
                    className="text-gray-600 dark:text-gray-400 mb-4"
                    isTextArea
                  />
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>
                )}
                
                {service.features && service.features.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Features:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start group">
                          <div className="before:content-['•'] before:mr-2 before:text-blue-500 flex-grow">
                            {isEditMode ? (
                              <EditableContent
                                value={feature}
                                onChange={(value) => updateServiceFeature(index, featureIndex, value)}
                                as="span"
                                className="text-gray-700 dark:text-gray-300"
                              />
                            ) : (
                              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                            )}
                          </div>
                          {isEditMode && (
                            <button
                              onClick={() => removeServiceFeature(index, featureIndex)}
                              className="opacity-0 group-hover:opacity-100 text-red-500 ml-2"
                              aria-label="Remove feature"
                            >
                              <FaTrash size={12} />
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                    
                    {isEditMode && (
                      <button
                        onClick={() => addServiceFeature(index)}
                        className="mt-2 px-3 py-1 flex items-center text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        <FaPlus className="mr-1" size={10} /> Add Feature
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Contact invitation */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg border border-blue-100 dark:border-blue-800">
          <div className="flex items-center mb-4">
            <FaEnvelope className="text-blue-600 dark:text-blue-400 text-xl mr-3" />
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">Interested in my services?</h3>
          </div>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            I'm available for both website development projects and tutoring sessions. 
            Please feel free to reach out for a consultation or to discuss your specific needs.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Me
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function ActivitiesPage() {
  return (
    <Suspense fallback={<ActivitiesPageLoading />}>
      <ActivitiesClient />
    </Suspense>
  );
} 