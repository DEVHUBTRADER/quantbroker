@@ .. @@
       
       <FloatingActions onOpenQuestionnaire={() => setIsQuestionnaireOpen(true)} />
+      
+      {/* Add proper navigation handling for floating actions */}
+      {typeof window !== 'undefined' && window.location.hash === '#plans' && (
+        <script>
+          {setTimeout(() => {
+            setCurrentView('plans');
+            window.location.hash = '';
+          }, 50)}
+        </script>
+      )}
       
       <LoginModal