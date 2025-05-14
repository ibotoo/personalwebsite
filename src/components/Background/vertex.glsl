attribute vec3 position;
attribute vec4 random;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;

varying vec4 vRandom;

void main() {
	vRandom = random;
	
	// position değerleri zaten -1 ile 1 arasında olacak şekilde ayarlandı
	vec3 pos = position;
	
	// Scale towards camera to be more interesting
	pos.z *= 12.0; // 10.0'dan 12.0'a çıkarıldı
	
	// modelMatrix is one of the automatically attached uniforms when using the Mesh class
	vec4 mPos = modelMatrix * vec4(pos, 1.0);

	// Add some movement in world space
	float t = uTime * 1.2;
	
	// Daha geniş hareket alanı
	float amplitude = 2.5; // 2.0'dan 2.5'e yükseltildi
	
	mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, amplitude, random.x);
	mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, amplitude, random.w);
	mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, amplitude, random.z);
	
	// Get the model view position so that we can scale the points off into the distance
	vec4 mvPos = viewMatrix * mPos;
	
	// Daha küçük parçacıklar
	gl_PointSize = 200.0 / length(mvPos.xyz) * (random.x + 0.1); // 250.0'dan 200.0'a düşürüldü
	gl_Position = projectionMatrix * mvPos;
}
