precision highp float;

uniform float uTime;
uniform vec3 uColor;

varying vec4 vRandom;

void main() {
	vec2 uv = gl_PointCoord.xy;
	
	float circle = smoothstep(0.5, 0.25, length(uv - 0.5)) * 0.8;
	
	vec3 finalColor = uColor * (0.9 + vRandom.y * 0.2);
	
	gl_FragColor.rgb = finalColor;
	gl_FragColor.a = circle;
}
