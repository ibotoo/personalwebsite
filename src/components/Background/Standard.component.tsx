import { Camera, Color, Geometry, Mesh, Program, Renderer } from 'ogl-typescript';
import { log } from 'next-axiom';
import { useEffectOnce } from 'react-use';
import { useRef } from 'react';

import { colors } from '~/lib';
import VertexShader from './vertex.glsl';
import FragmentShader from './fragment.glsl';

export function Standard(): JSX.Element {
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffectOnce(() => {
		let animationId = 1;

		const renderer = new Renderer({
			depth: false,
			dpr: 1,
			alpha: true,
		});

		const gl = renderer.gl;

		const camera = new Camera(gl, {
			fov: 15,
		});
		camera.position.z = 15;

		function handleReisze(): void {
			const width = window.innerWidth;
			const height = window.innerHeight;
			renderer.setSize(width, height);
			camera.perspective({
				aspect: width / height,
			});
		}

		try {
			if (containerRef.current) {
				containerRef.current.appendChild(gl.canvas);
				gl.clearColor(0, 0, 0, 0);
				window.addEventListener('resize', handleReisze, false);
				handleReisze();
			}
		} catch (error) {
			console.error(error);
			log.error('Failed to initialize canvas', error);
			return;
		}

		const numParticles = 25;
		const position = new Float32Array(numParticles * 3);
		const random = new Float32Array(numParticles * 4);

		for (let i = 0; i < numParticles; i++) {
			position.set([
				Math.random() * 2 - 1,
				Math.random() * 2 - 1,
				Math.random() * 2 - 1
			], i * 3);

			random.set([
				Math.random(),
				Math.random(),
				Math.random(),
				Math.random()
			], i * 4);
		}

		const geometry = new Geometry(gl, {
			position: {
				size: 3,
				data: position,
			},
			random: {
				size: 4,
				data: random,
			},
		});

		const program = new Program(gl, {
			vertex: VertexShader,
			fragment: FragmentShader,
			uniforms: {
				uTime: {
					value: 0,
				},
				uColor: {
					value: new Color(colors.primary[500]),
				},
			},
			transparent: true,
			depthTest: false,
		});

		const particles = new Mesh(gl, {
			mode: gl.POINTS,
			geometry,
			program,
		});

		let lastFrameTime = 0;
		const frameInterval = 1000 / 30;

		function update(timestamp: number): void {
			animationId = requestAnimationFrame(update);

			const elapsed = timestamp - lastFrameTime;
			if (elapsed < frameInterval) return;

			lastFrameTime = timestamp - (elapsed % frameInterval);

			particles.rotation.z += 0.0015;
			program.uniforms.uTime.value = timestamp * 0.00015;

			renderer.render({
				scene: particles,
				camera: camera,
			});
		}

		animationId = requestAnimationFrame(update);

		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener('resize', handleReisze);
			if (containerRef.current && gl.canvas.parentNode === containerRef.current) {
				containerRef.current.removeChild(gl.canvas);
			}
		};
	});

	return <div className="fixed inset-0 -z-10" ref={containerRef} />;
}
